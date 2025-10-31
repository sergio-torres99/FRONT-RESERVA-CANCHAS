"use client";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import CourtIndications from "@/app/components/CourtIndications";
import useApi from "@/app/hooks/useApi";
import { Court, CourtsResponse } from "@/app/types/escenarios";
import { defaultCourt } from "@/app/utils/constants";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const Cancha = () => {
  const { id }: { id: string } = useParams();
  const { back } = useRouter();
  const [courtData, setCourtData] = useState<Court>(defaultCourt);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [bookingDay, setBookingDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isTimeSlotsLoading, setIsTimeSlotsLoading] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const { apiClient } = useApi();

  const { name, img } = courtData;

  const getCourtById = async () => {
    try {
      setIsLoadingData(true);
      const courtDataResponse = await apiClient<CourtsResponse>(
        `/api/canchas/${id}`
      );
      const {
        nombre,
        precioPorHora,
        id: courtId,
        tipoCancha,
      } = courtDataResponse;
      const parsedCourt: Court = {
        address: "Calle 44 #47a - 22",
        id: courtId,
        img: "https://civideportes.com.co/wp-content/uploads/2019/08/Cancha-de-f%C3%BAtbol-11.jpg",
        name: nombre,
        price: String(precioPorHora),
        type: tipoCancha,
      };
      setCourtData(parsedCourt);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDateOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsTimeSlotsLoading(true);
      const {
        target: { value },
      } = e;
      if (!value) return;
      setBookingDay(value);
      const availableTimeSlots = await apiClient<string[]>(
        `/api/reservas/slots-disponibles?canchaId=${id}&fecha=${value}`
      );
      setTimeSlots(availableTimeSlots);
    } catch (error) {
      console.error(error);
      setTimeSlots([]);
    } finally {
      setIsTimeSlotsLoading(false);
    }
  };

  useEffect(() => {
    getCourtById();
  }, []);

  return (
    <>
      <div className="w-4/5 mx-auto flex flex-col gap-2">
        {isLoadingData ? (
          <div className="w-full h-full p-4">
            <div className="animate-pulse space-x-4">
              <div className="grid grid-cols-[2fr_1fr] gap-5">
                <div className="space-y-5">
                  <div className="h-70 2xl:h-100 rounded-3xl bg-gray-300" />
                  <div className="h-10 2xl:h-20 rounded-3xl bg-gray-300" />
                  <div className="h-10 2xl:h-20 rounded-3xl bg-gray-300" />
                  <div className="h-10 2xl:h-20 rounded-3xl bg-gray-300" />
                </div>
                <div className="space-y-3 rounded-3xl bg-gray-300" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-7">
            {/* Cancha Header */}
            <div className="flex gap-5 items-center">
              <button
                className="cursor-pointer rounded-xl border-2 border-green-dark p-2 hover:scale-102 transition duration-75"
                onClick={back}
              >
                <div className="w-4 h-4 border-l-2 border-b-2 border-green-dark rotate-45 ml-1"></div>
              </button>
              <h1 className="text-4xl font-bold pb-1">{name}</h1>
            </div>

            {/* Detalles cancha */}
            <div className="grid grid-cols-[3fr_2fr] gap-5">
              <div className="flex flex-col gap-3">
                <div className="relative w-full h-80">
                  {img ? (
                    <Image
                      src={img}
                      alt="court-image"
                      className="rounded-2xl object-cover"
                      fill
                      priority
                    />
                  ) : null}
                </div>
                <CourtIndications />
              </div>

              {/* Bloques disponibles */}
              <div className="bg-green-dark rounded-2xl p-5">
                <div className="flex flex-col gap-5">
                  <div className="space-y-2 flex flex-col items-center bg-green-light p-3 py-5 rounded-2xl">
                    <p className="font-bold text-xl text-text-dark">
                      Selecciona la fecha de reserva
                    </p>
                    <input
                      disabled={isTimeSlotsLoading}
                      type="date"
                      className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                      onChange={handleDateOnChange}
                      value={bookingDay}
                      min={new Date().toISOString().split("T")[0]}
                      max={
                        new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {isTimeSlotsLoading && <p>Cargando bloques disponibles</p>}
                    {!isTimeSlotsLoading &&
                      timeSlots?.map((ts) => (
                        <button
                          onClick={() => {
                            setOpenConfirmationModal(true);
                            setSelectedTime(ts);
                          }}
                          key={ts}
                          className="bg-green-light text-text-dark py-2 rounded-4xl text-xl text-center cursor-pointer hover:scale-102 transition duration-75"
                        >
                          {ts}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmationModal
        open={openConfirmationModal}
        setOpen={setOpenConfirmationModal}
        courtData={courtData}
        selectedDate={bookingDay}
        selectedTime={selectedTime}
        setOpenToast={setOpenToast}
        openToast={openToast}
        setTimeSlots={setTimeSlots}
      />
      {openToast && (
        <div className="absolute top-5 right-5 animate-bounce duration-1000 bg-green-light shadow-2xl p-4 rounded-2xl text-xl rounded-tr-none rounded-br-none border-r-4 border-green-dark">
          ¡Todo listo! Su reserva ha sido guardada correctamente.
        </div>
      )}
    </>
  );
};

export default Cancha;
