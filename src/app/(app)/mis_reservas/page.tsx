"use client";
import { useAuth } from "@/app/context/AuthContext";
import useApi from "@/app/hooks/useApi";
import { CourtsResponse } from "@/app/types/escenarios";
import { useEffect, useState } from "react";
import "../../styles/mis-reservas.css";

type MyBookings = {
  id: number;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  usuarioId: number;
  canchaId: number;
  nombre?: string;
  precioPorHora?: number;
  tipoCancha?: string;
};

const MisReservas = () => {
  const { user } = useAuth();
  const { apiClient } = useApi();
  const [myBookings, setMyBookings] = useState<MyBookings[]>([]);

  const gellAllBookings = async () => {
    try {
      const allBookings = await apiClient<MyBookings[]>("/api/reservas");
      const filteredBookings = allBookings.filter(
        (booking) => booking.usuarioId === user?.id
      );
      const uniqueIds = [...new Set(filteredBookings.map((b) => b.canchaId))];
      const results = await Promise.all(
        uniqueIds.map(async (canchaId) => {
          return await apiClient<CourtsResponse>(`/api/canchas/${canchaId}`);
        })
      );
      const parsedBookings = filteredBookings.map((booking) => {
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
    }
  };

  const deleteBooking = async (bookingId: number) => {
    try {
      await apiClient(`/api/reservas/${bookingId}`, {
        method: "DELETE",
      });
      setMyBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    gellAllBookings();
  }, []);

  return (
    <div className="w-3/4 mx-auto flex flex-col gap-5">
      <h1 className="text-5xl font-semibold">Mis Reservas</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <thead
          style={{
            backgroundColor: "#f2f2f2",
          }}
        >
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
              <td>{r.nombre || "—"}</td>
              <td>{r.fechaReserva}</td>
              <td>{r.horaInicio}</td>
              <td>{r.horaFin}</td>
              <td>{r.precioPorHora ? `$${r.precioPorHora}` : "—"}</td>
              <td>{r.tipoCancha || "—"}</td>
              <td>
                <button
                  className="cursor-pointer"
                  onClick={() => deleteBooking(r.id)}
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
    </div>
  );
};

export default MisReservas;
