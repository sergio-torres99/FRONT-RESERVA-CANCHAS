"use client";
import { useAuth } from "@/app/context/AuthContext";
import useApi from "@/app/hooks/useApi";
import { CourtsResponse } from "@/app/types/escenarios";
import { useEffect, useState } from "react";
import "../../styles/mis-reservas.css";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import Link from "next/link";
import { MyBooking } from "@/app/types/mis-reservas";

const MisReservas = () => {
  const { user } = useAuth();
    const { apiClient } = useApi();
  const [myBookings, setMyBookings] = useState<MyBooking[]>([]);
  const [isLoadingMyBookings, setIsLoadingMyBookings] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({} as MyBooking);

  const noBookingsFound = myBookings.length === 0;

  const getAllBookings = async () => {
    try {
      setIsLoadingMyBookings(true);
      const allMyBookings = await apiClient<MyBooking[]>(
        `/api/reservas/usuario/${user?.id}`
      );
      const uniqueIds = [...new Set(allMyBookings.map((b) => b.canchaId))];
      const results = await Promise.all(
        uniqueIds.map(async (canchaId) => {
          return await apiClient<CourtsResponse>(`/api/canchas/${canchaId}`);
        })
      );

      const parsedBookings = allMyBookings.map((booking) => {
        for (const court of results) {
          const { id, ...restCourt } = court;
          if (booking.canchaId === id) {
            return { ...booking, ...restCourt };
          }
        }
        return booking;
      });

      setMyBookings(parsedBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMyBookings(false);
    }
  };

  const deleteBooking = async (bookingId: number) => {
    try {
      await apiClient(`/api/reservas/${bookingId}`, {
        method: "DELETE",
      });
      setMyBookings((prev) => prev.filter((b) => b.id !== bookingId));
      setOpenToast(true);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  useEffect(() => {
    if (openToast) {
      setTimeout(() => {
        setOpenToast(false);
      }, 6000);
    }
  }, [openToast, setOpenToast]);

  return (
    <>
      <div className="px-15 flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Mis Reservas</h1>
        <p className="text-xl mt-5">
          Consulta y gestiona tus reservas de canchas. Aquí puedes ver la fecha,
          hora, precio y tipo de cancha, o eliminar una reserva si lo necesitas.
        </p>
        {isLoadingMyBookings && (
          <div className="w-full mx-auto mt-10">
            <div className="animate-pulse space-x-4">
              <div className="flex flex-col gap-5">
                <div className="h-15 rounded-3xl bg-gray-300" />
                <div className="h-15 rounded-3xl bg-gray-300" />
                <div className="h-15 rounded-3xl bg-gray-300" />
                <div className="h-15 rounded-3xl bg-gray-300" />
                <div className="h-15 rounded-3xl bg-gray-300" />
                <div className="h-15 rounded-3xl bg-gray-300" />
              </div>
            </div>
          </div>
        )}
        {noBookingsFound && (
          <div className=" h-50 flex flex-col justify-center items-center gap-1">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/keek-line/48/nothing-found.png"
              alt="nothing-found"
            />
            <p className="text-3xl">No se encontraron reservas.</p>
          </div>
        )}
        {!isLoadingMyBookings && !noBookingsFound && (
          <table className="w-full mt-5">
            <thead className="bg-green-light text-left">
              <tr>
                <th>Cancha</th>
                <th>Fecha</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Precio por Hora</th>
                <th>Tipo de Cancha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((r, i) => (
                <tr key={i} className="border-b-1 border-text-dark/20">
                  <td>
                    <Link
                      href={`/escenarios/${r.canchaId}`}
                      className="underline text-green-dark"
                    >
                      {r.nombre || "—"}
                    </Link>
                  </td>
                  <td>{r.fechaReserva}</td>
                  <td>{r.horaInicio}</td>
                  <td>{r.horaFin}</td>
                  <td>{r.precioPorHora ? `$${r.precioPorHora}` : "—"}</td>
                  <td>{r.tipoCancha || "—"}</td>
                  <td>
                    <button
                      className="cursor-pointer bg-red-100 p-1 rounded-2xl hover:scale-103 transition duration-75"
                      onClick={() => {
                        setSelectedBooking(r);
                        setOpenModal(true);
                      }}
                    >
                      <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/sf-ultralight/25/trash.png"
                        alt="trash"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeleteConfirmationModal
        open={openModal}
        setOpen={setOpenModal}
        bookingDate={selectedBooking.fechaReserva}
        time={[selectedBooking.horaInicio, selectedBooking.horaFin]}
        courtName={selectedBooking.nombre ?? ""}
        handleConfirmation={() => deleteBooking(selectedBooking.id)}
      />
      {openToast && (
        <div className="absolute top-5 right-5 animate-bounce duration-1000 bg-green-light shadow-2xl p-4 rounded-2xl text-xl rounded-tr-none rounded-br-none border-r-4 border-green-dark">
          ¡Tu reserva ha sido eliminada correctamente!
        </div>
      )}
    </>
  );
};

export default MisReservas;
