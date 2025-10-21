"use client";
import { useRouter } from "next/navigation";

const mockedData = [
  {
    id: 1,
    name: "Cancha El Golazo",
    img: "https://example.com/cancha1.jpg",
    address: "Av. Siempre Viva 123, Ciudad Deportiva",
    description:
      "Cancha de pasto sintético con iluminación nocturna y vestuarios.",
    aforum: 10,
    available_times: ["08:00", "10:00", "16:00", "20:00"],
  },
  {
    id: 2,
    name: "Fútbol Center",
    img: "https://example.com/cancha2.jpg",
    address: "Calle Fútbol 456, Zona Centro",
    description: "Instalaciones modernas y techadas, ideal para torneos.",
    aforum: 12,
    available_times: ["09:00", "11:00", "13:00", "19:00"],
  },
  {
    id: 3,
    name: "La Canchita",
    img: "https://example.com/cancha3.jpg",
    address: "Av. Los Deportistas 789",
    description: "Cancha económica ideal para partidos entre amigos.",
    aforum: 8,
    available_times: ["07:00", "12:00", "15:00", "21:00"],
  },
  {
    id: 4,
    name: "Estadio 5",
    img: "https://example.com/cancha4.jpg",
    address: "Boulevard Deportivo 1010",
    description: "Complejo con múltiples canchas y cafetería.",
    aforum: 14,
    available_times: ["10:00", "14:00", "18:00", "22:00"],
  },
  {
    id: 5,
    name: "FútbolManía",
    img: "https://example.com/cancha5.jpg",
    address: "Diagonal Gol 2020",
    description: "Cancha con césped natural y gradería para público.",
    aforum: 20,
    available_times: ["09:00", "11:00", "17:00", "19:00"],
  },
  {
    id: 6,
    name: "Pateando Balones",
    img: "https://example.com/cancha6.jpg",
    address: "Calle del Deporte 33",
    description: "Ambiente familiar y buena iluminación.",
    aforum: 10,
    available_times: ["08:00", "12:00", "16:00", "20:00"],
  },
  {
    id: 7,
    name: "Golazo FC",
    img: "https://example.com/cancha7.jpg",
    address: "Ruta 40, Km 15",
    description: "Cancha con vista panorámica y zona de asadores.",
    aforum: 16,
    available_times: ["10:00", "13:00", "17:00", "21:00"],
  },
  {
    id: 8,
    name: "Zona Fútbol",
    img: "https://example.com/cancha8.jpg",
    address: "Av. Atlética 88",
    description: "Complejo con tienda deportiva y zona de espera.",
    aforum: 18,
    available_times: ["07:00", "09:00", "15:00", "19:00"],
  },
  {
    id: 9,
    name: "Cancha Central",
    img: "https://example.com/cancha9.jpg",
    address: "Centro Deportivo Municipal",
    description: "Ubicación céntrica, ideal para partidos rápidos.",
    aforum: 12,
    available_times: ["08:00", "14:00", "18:00", "22:00"],
  },
  {
    id: 10,
    name: "Fútbol Pro",
    img: "https://example.com/cancha10.jpg",
    address: "Camino al Gol 505",
    description: "Cancha profesional con medidas reglamentarias.",
    aforum: 22,
    available_times: ["09:00", "11:00", "17:00", "20:00"],
  },
];

const Page = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="g w-4/5 mx-auto gap-2.5">
        <h1 className="text-4xl font-bold mb-8">Escenarios Disponibles</h1>
      </div>
      <div className="grid grid-cols-3 w-4/5 mx-auto gap-2.5">
        {mockedData.map((c) => (
          <div
            className="m-2 flex flex-col items-center rounded-4xl p-4 gap-1.5 shadow-lg border border-gray-300"
            key={c.address}
          >
            <img src="cancha.jpg" className="w-full rounded-2xl" alt="" />
            <div className="flex flex-col items-center">
              <p className="text-2xl">{c.name}</p>
              <p>{c.address}</p>
            </div>
            <button className="bg-green-dark text-white px-4 py-2 mt-2 rounded-2xl w-1/2 cursor-pointer" onClick={() => push(`escenarios/${c.id}`)}>
              Reservar
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
