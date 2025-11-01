"use client";
import { useAuth } from "@/app/context/AuthContext";
import useApi from "@/app/hooks/useApi";
import { Court, CourtsResponse } from "@/app/types/escenarios";
import { MyBooking } from "@/app/types/mis-reservas";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../styles/mis-reservas.css";

function getProximaReserva(reservas: MyBooking[]) {
  const ahora = new Date();

  const futuras = reservas
    .map((r) => ({
      ...r,
      fechaHora: new Date(`${r.fechaReserva}T${r.horaInicio}`),
    }))
    .filter((r) => r.fechaHora > ahora)
    .sort((a, b) => a.fechaHora.getTime() - b.fechaHora.getTime());

  return futuras[0] || null;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { apiClient } = useApi();
  const [myNextBooking, setMyNextBooking] = useState<MyBooking>(
    {} as MyBooking
  );
  const [totalCourts, setTotalCourts] = useState(0);

  const getMyNextBooking = async () => {
    try {
      const allMyBookings = await apiClient<MyBooking[]>(
        `/api/reservas/usuario/${user?.id}`
      );
      const nextBooking = getProximaReserva(allMyBookings);

      let courtData: Partial<CourtsResponse> = {
        id: 0,
        imagenURL: "",
        nombre: "",
        precioPorHora: 0,
        tipoCancha: "",
        ubicacion: "",
      };
      if (nextBooking?.canchaId) {
        const courtDataResp = await apiClient<CourtsResponse>(
          `/api/canchas/${nextBooking.canchaId}`
        );
        courtData = { ...courtDataResp };
      }
      const parsedNextBooking: MyBooking = { ...nextBooking, ...courtData };
      console.log(parsedNextBooking);
      setMyNextBooking(parsedNextBooking);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCourts = async () => {
    try {
      const courtsDataResponse = await apiClient<CourtsResponse[]>(
        "/api/canchas"
      );
      setTotalCourts(courtsDataResponse.length ?? 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyNextBooking();
    getAllCourts();
  }, []);

  return (
    <div className="px-15 flex flex-col gap-5">
      <header className="flex justify-between items-center sticky top-0 z-10">
        <div className="text-4xl text-text-dark font-bold capitalize">
          Hola, {user?.name}
        </div>
      </header>
      <div className="flex gap-5">
        <div className="bg-gray-100 p-5 rounded-2xl w-full">
          <p className="text-xl">Tu reserva más próxima es:</p>
          {myNextBooking.nombre ? (
            <table className="w-full mt-5 bg-custom-white rounded-2xl">
              <thead className="border-b-1 border-gray-200 text-left">
                <tr>
                  <th className="font-medium">Cancha</th>
                  <th className="font-medium">Fecha</th>
                  <th className="font-medium">Hora Inicio</th>
                  <th className="font-medium">Hora Fin</th>
                  <th className="font-medium">Precio por Hora</th>
                  <th className="font-medium">Tipo de Cancha</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-1 border-text-dark/20">
                  <td>
                    <Link
                      href={`/escenarios/${myNextBooking.canchaId}`}
                      className="underline text-green-dark"
                    >
                      {myNextBooking.nombre || "—"}
                    </Link>
                  </td>
                  <td>{myNextBooking.fechaReserva}</td>
                  <td>{myNextBooking.horaInicio}</td>
                  <td>{myNextBooking.horaFin}</td>
                  <td>
                    {myNextBooking.precioPorHora
                      ? `$${myNextBooking.precioPorHora}`
                      : "—"}
                  </td>
                  <td>{myNextBooking.tipoCancha || "—"}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-2xl font-semibold">
              No tienes reservas
            </div>
          )}
        </div>
        <div className="bg-green-light w-[200px] p-7 rounded-2xl flex flex-col items-center gap-3">
          <div className="bg-custom-white rounded-[100%] p-4 w-28 h-28">
            <img
              src="https://img.icons8.com/forma-thin/72/user.png"
              alt="user"
              className="w-full h-full"
            />
          </div>
          <div>
            <p className="capitalize text-xl">
              {user?.name} {user?.lastName}
            </p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="bg-green-light w-[300px] p-7 rounded-2xl flex flex-col items-center justify-center gap-3">
          <p className="text-4xl font-bold">{totalCourts}</p>
          <p className="text-lg">Canchas disponibles</p>
        </div>
        <div className="bg-gray-100 p-5 rounded-2xl w-full">
          <p className="font-semibold text-lg">Recuerda:</p>
          <ol className="list-decimal list-inside flex flex-col gap-3">
            <li>
              Para reservar, ve a <strong>Escenarios</strong> y selecciona la
              cancha que desees.
            </li>
            <li>
              Para cancelar, ingresa a <strong>Mis Reservas</strong> y
              selecciona la reserva que quieras anular.
            </li>
            <li>
              Puedes consultar los horarios disponibles directamente desde{" "}
              <strong>Escenarios</strong>.
            </li>
            <li>Los pagos del valor de la reserva se realizan en el sitio</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
