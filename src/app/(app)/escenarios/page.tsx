"use client";
import useApi from "@/app/hooks/useApi";
import { Court, CourtsResponse } from "@/app/types/escenarios";
import { formatearRespuesta } from "@/app/utils/functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isLoadingCourts, setIsLoadingCourts] = useState(false);
  const { push } = useRouter();
  const { apiClient } = useApi();

  console.log(courts);

  const getAllCourts = async () => {
    try {
      setIsLoadingCourts(true);
      const courtsDataResponse = await apiClient<CourtsResponse>(
        "/api/canchas"
      );
      const dataFormateada = formatearRespuesta(courtsDataResponse);
      setCourts(dataFormateada);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCourts(false);
    }
  };

  useEffect(() => {
    getAllCourts();
  }, []);

  return (
    <div className="">
      <div className="g w-4/5 mx-auto gap-2.5">
        <h1 className="text-4xl font-bold mb-8">Escenarios Disponibles</h1>
      </div>
      <div className="grid grid-cols-3 w-4/5 mx-auto gap-2.5">
        {isLoadingCourts && <p>Cargando Escenarios...</p>}
        {!isLoadingCourts &&
          courts.map(({ id, address, name }) => (
            <div
              className="m-2 flex flex-col items-center rounded-3xl gap-4 shadow-lg border pb-4 border-gray-300 max-w-[500px]"
              key={id}
            >
              <div className="relative w-full h-50">
                <Image
                  src="/cancha.jpg"
                  alt="court-image"
                  className="rounded-t-3xl object-cover"
                  fill
                  priority
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-3xl font-medium">{name}</p>
                <p>{address}</p>
              </div>
              <button
                className="bg-green-dark text-custom-white text-xl px-4 py-2 mt-2 rounded-4xl w-1/2 cursor-pointer hover:scale-102 transition duration-75"
                onClick={() => push(`escenarios/${id}`)}
              >
                <div className="pb-1">Reservar</div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
