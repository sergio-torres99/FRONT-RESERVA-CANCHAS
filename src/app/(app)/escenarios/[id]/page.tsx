"use client";
import { Court } from "@/app/types/escenarios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultCourt: Court = {
  id: "",
  name: "",
  address: "",
  description: "",
  price: "",
  available_date: { date: "", time_slots: [] },
  img: "",
};

const mockCourt: Court = {
  id: "c1a2b3d4",
  name: "Cancha Los Pinos",
  address: "Av. Siempre Viva 123, Ciudad Deportiva",
  description:
    "Cancha de fútbol 7 con césped sintético, iluminación nocturna y vestuarios.",
  price: "15.000",
  available_date: {
    date: "23/10/2025",
    time_slots: [
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
    ],
  },
  img: "/cancha.jpg",
};

const Cancha = () => {
  // const { id }: { id: string } = useParams();
  const { back } = useRouter();
  const [courtData, setCourtData] = useState<Court>(defaultCourt);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const {
    address,
    description,
    name,
    price,
    available_date: { time_slots },
    img,
  } = courtData;

  const getCourtById = async () => {
    try {
      setIsLoadingData(true);
      const courtDataResponse = await new Promise<Court>((res) =>
        setTimeout(() => res(mockCourt), 2000)
      );
      setCourtData(courtDataResponse);
      return courtDataResponse;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getCourtById();
  }, []);

  return (
    <div className="w-4/5 mx-auto flex flex-col gap-2">
      {isLoadingData ? (
        <p>Cargando cancha...</p>
      ) : (
        <div className="flex flex-col gap-7">
          {/* Cancha Header */}
          <div className="flex gap-5 items-center">
            <button
              className="cursor-pointer rounded-2xl border-1 border-green-dark p-1.5 hover:scale-102 transition duration-75"
              onClick={back}
            >
              <Image
                src="/left-arrow.png"
                alt="arrow-back"
                className="rounded-2xl object-cover"
                width={20}
                height={20}
              />
            </button>
            <h1 className="text-4xl font-bold pb-1">{name}</h1>
          </div>

          {/* Detalles cancha */}
          <div className="grid grid-cols-[3fr_2fr] gap-5">
            <div>
              <div className="relative w-full h-80">
                {img ? (
                  <Image
                    src={img}
                    alt="court-image"
                    className="rounded-2xl object-cover"
                    fill
                    priority
                  />
                ) : null}
              </div>
              <p>
                <b>Dirección:</b> {address}
              </p>
              <p className="my-2 font-bold">{description}</p>
            </div>

            {/* Bloques disponibles */}
            <div className="bg-gray-200 rounded-2xl p-5">
              {/* <p>{date}</p> */}
              <div className="flex gap-3 items-end">
                <p className="text-4xl font-bold text-custom-white">{price} </p>
                <p className="text-custom-white text-xl">x 1 hora</p>
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-bold text-2xl text-custom-white">
                  Bloques disponibles
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {time_slots.map((ts) => (
                    <button
                      key={ts}
                      className="bg-green-light text-custom-white py-2 rounded-4xl text-xl text-center cursor-pointer hover:scale-102 transition duration-75"
                    >
                      {ts}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cancha;
