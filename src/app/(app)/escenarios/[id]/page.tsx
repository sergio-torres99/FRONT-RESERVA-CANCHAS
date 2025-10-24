"use client";
import useApi from "@/app/hooks/useApi";
import { Court } from "@/app/types/escenarios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const defaultCourt: Court = {
  id: "",
  name: "",
  address: "",
  description: "",
  price: "",
  available_date: { date: "", time_slots: [] },
  img: "",
};

const mockCourt: Court = {
  id: "c1a2b3d4",
  name: "Cancha Los Pinos",
  address: "Av. Siempre Viva 123, Ciudad Deportiva",
  description:
    "Cancha de fútbol 7 con césped sintético, iluminación nocturna y vestuarios.",
  price: "15.000",
  available_date: {
    date: "23/10/2025",
    time_slots: [
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
    ],
  },
  img: "/cancha.jpg",
};

const mockTimeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
];

const Cancha = () => {
  const { id }: { id: string } = useParams();
  const { back } = useRouter();
  const [courtData, setCourtData] = useState<Court>(defaultCourt);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [bookingDay, setBookingDay] = useState("");
  const [timeSlots, setTimeSlots] = useState(mockTimeSlots);
  const [isTimeSlotsLoading, setIsTimeSlotsLoading] = useState(false);
  const { apiClient } = useApi();

  const { address, description, name, price, img } = courtData;

  const getCourtById = async () => {
    try {
      setIsLoadingData(true);
      const courtDataResponse = await new Promise<Court>((res) =>
        setTimeout(() => res(mockCourt), 2000)
      );
      setCourtData(courtDataResponse);
      return courtDataResponse;
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
      setBookingDay(value);
      const availableTimeSlots = await apiClient(
        `/api/canchass/${id}?selected_day=${value}`
      );
      setTimeSlots((availableTimeSlots as []) ?? []);
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

  console.log({ timeSlots });
  return (
    <div className="w-4/5 mx-auto flex flex-col gap-2">
      {isLoadingData ? (
        <p>Cargando cancha...</p>
      ) : (
        <div className="flex flex-col gap-7">
          {/* Cancha Header */}
          <div className="flex gap-5 items-center">
            <button
              className="cursor-pointer rounded-2xl border-1 border-green-dark p-1.5 hover:scale-102 transition duration-75"
              onClick={back}
            >
              <Image
                src="/left-arrow.png"
                alt="arrow-back"
                className="rounded-2xl object-cover"
                width={20}
                height={20}
              />
            </button>
            <h1 className="text-4xl font-bold pb-1">{name}</h1>
          </div>

          {/* Detalles cancha */}
          <div className="grid grid-cols-[3fr_2fr] gap-5">
            <div>
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
              <p>
                <b>Dirección:</b> {address}
              </p>
              <p className="my-2 font-bold">{description}</p>
            </div>

            {/* Bloques disponibles */}
            <div className="bg-gray-200 rounded-2xl p-5">
              {/* <p>{date}</p> */}
              <div className="flex gap-3 items-end">
                <p className="text-4xl font-bold text-custom-white">{price} </p>
                <p className="text-custom-white text-xl">x 1 hora</p>
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-bold text-xl text-custom-white">
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
                <div className="grid grid-cols-2 gap-3">
                  {isTimeSlotsLoading && <p>Cargando bloques disponibles</p>}
                  {!isTimeSlotsLoading &&
                    timeSlots?.map((ts) => (
                      <button
                        key={ts}
                        className="bg-green-light text-custom-white py-2 rounded-4xl text-xl text-center cursor-pointer hover:scale-102 transition duration-75"
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
  );
};

export default Cancha;
