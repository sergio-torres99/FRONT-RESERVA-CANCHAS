import { Court, CourtsResponse } from "../types/escenarios";

export const formatearRespuesta = (courtsData: CourtsResponse) =>
  courtsData.map((c) => ({
    address: "",
    available_date: { date: "", time_slots: [] },
    description: "",
    id: c.id,
    img: "",
    name: c.nombre,
    price: String(c.precioPorHora),
  })) as Court[];