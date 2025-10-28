import { Court } from "../types/escenarios";

export const API_BASE_URL = "http://localhost:8080";

export const sidebarOptions: { path: string; label: string }[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/mis_reservas",
    label: "Mis Reservas",
  },
  {
    path: "/escenarios",
    label: "Escenarios",
  },
];

export const defaultCourt: Court = {
  id: "",
  name: "",
  address: "",
  price: "",
  img: "",
};
