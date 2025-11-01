import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import { formatearFecha } from "../utils/functions";

type ConfirmationModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  courtName: string;
  bookingDate: string;
  time: string[];
  handleConfirmation: () => Promise<void>;
};

const DeleteConfirmationModal = ({
  open,
  setOpen,
  courtName,
  bookingDate,
  handleConfirmation,
  time
}: ConfirmationModalProps) => {

  return (
    open && (
      <div className="w-full absolute h-screen bg-black/70 top-0 left-0 flex justify-center items-center">
        <div className="bg-custom-white rounded-2xl w-150 px-8 py-6 flex flex-col gap-8 relative">
          <div className="flex justify-center">
            <h3 className="text-3xl font-semibold text-center">
              Eliminar Reserva
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
            ¿Deseas eliminar tu reserva en la cancha <b>{courtName}</b>&nbsp;
            el <b>{bookingDate}</b> de <b>{time[0]}</b> a <b>{time[1]}</b>?
          </p>
          <div className="w-full h-full flex gap-5 items-end justify-center">
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-green-light  p-3 rounded-2xl cursor-pointer uppercase font-semibold hover:scale-102 transition duration-75"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmation}
              className="w-full bg-red-500 text-custom-white p-3 rounded-2xl cursor-pointer uppercase font-semibold hover:scale-102 transition duration-75"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
