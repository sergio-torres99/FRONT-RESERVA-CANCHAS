import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import { Court } from "../types/escenarios";

type ConfirmationModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  courtData: Court;
  selectedDate: string;
  selectedTime: string;
};

function formatearFecha(fechaISO: string) {
  const [year, month, day] = fechaISO.split("-");
  console.log({ year, month, day });
  return `${day}/${month}/${year}`;
}

const ConfirmationModal = ({
  open,
  setOpen,
  courtData,
  selectedDate,
  selectedTime,
}: ConfirmationModalProps) => {
  const { user } = useAuth();
  const { push } = useRouter();
  const { apiClient } = useApi();
  const { name, price, type, id: courtId } = courtData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedSelectedDate = formatearFecha(selectedDate);

  const handleCourtBooking = async () => {
    try {
      setIsSubmitting(true);
      const [startTime, endTime] = selectedTime.split("-");
      console.log({ startTime, endTime });
      await apiClient("/api/reservas", {
        method: "POST",
        body: JSON.stringify({
          canchaId: courtId,
          usuarioId: user?.id ?? "",
          fechaHoraInicio: startTime.trim() ?? "",
          fechaHoraFin: endTime.trim() ?? "",
        }),
      });
      await new Promise((res) => setTimeout(() => res([]), 2000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    open && (
      <div className="w-full absolute h-screen bg-black/70 top-0 left-0 flex justify-center items-center">
        <div className="bg-custom-white rounded-2xl w-150 px-8 py-6 flex flex-col gap-8 relative">
          <div className="flex justify-center">
            <h3 className="text-3xl font-semibold text-center">
              Confirma tu reserva
            </h3>
            <button
              className="cursor-pointer absolute top-4 right-4 hover:scale-102 transition duration-75"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 50 50"
              >
                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
              </svg>
            </button>
          </div>
          <p className="text-center text-xl">
            ¿Deseas confirmar tu reserva en la cancha <b>{name}</b> el&nbsp;
            <b>{parsedSelectedDate}</b>?
          </p>
          <div className="flex justify-evenly w-full">
            <div className="flex items-end gap-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/small/32/1A1A1A/price-tag-usd.png"
                alt="price-tag-usd"
              />
              <p className="text-xl font-semibold">{price} COP</p>
            </div>
            <div className="flex items-end gap-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/forma-thin/24/1A1A1A/stadium.png"
                alt="stadium"
              />
              <p className="text-xl font-semibold">{type}</p>
            </div>
            <div className="flex items-end gap-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/forma-thin-sharp/24/1A1A1A/clock.png"
                alt="clock"
              />
              <p className="text-xl font-semibold">{selectedTime}</p>
            </div>
          </div>

          <div className="w-full h-full flex gap-5 items-end justify-center">
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-green-light  p-3 rounded-2xl cursor-pointer uppercase font-semibold hover:scale-102 transition duration-75"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                await handleCourtBooking();
                setOpen(false);
                push("/escenarios");
              }}
              className="w-full bg-green-dark text-custom-white p-3 rounded-2xl cursor-pointer uppercase font-semibold hover:scale-102 transition duration-75"
            >
              {isSubmitting ? "Cargando..." : "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
