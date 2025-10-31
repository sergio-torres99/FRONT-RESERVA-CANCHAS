import { Court, CourtsResponse } from "../types/escenarios";

export const formatearRespuesta = (courtsData: CourtsResponse[]) =>
  courtsData.map((c) => ({
    id: c.id,
    img: "",
    name: c.nombre,
    price: String(c.precioPorHora),
  })) as Court[];

export const formatearFecha = (fechaISO: string) => {
  const [year, month, day] = fechaISO.split("-");
  return `${day}/${month}/${year}`;
};
