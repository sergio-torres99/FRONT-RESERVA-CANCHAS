import { Court, CourtsResponse } from "../types/escenarios";

export const formatearRespuesta = (courtsData: CourtsResponse[]) =>
  courtsData.map((c) => ({
    id: c.id,
    img: c.imagenURL,
    name: c.nombre,
    price: String(c.precioPorHora),
    address: c.ubicacion,
    type: c.tipoCancha,
  })) as Court[];

export const formatearFecha = (fechaISO: string) => {
  const [year, month, day] = fechaISO.split("-");
  return `${day}/${month}/${year}`;
};

export const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});