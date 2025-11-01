"use client";
import useApi from "@/app/hooks/useApi";
import { Court, CourtsResponse } from "@/app/types/escenarios";
import { formatearRespuesta, formatoCOP } from "@/app/utils/functions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [initialCourts, setInitialCourts] = useState<Court[]>([]);
  const [isLoadingCourts, setIsLoadingCourts] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { push } = useRouter();
  const { apiClient } = useApi();

  const noCourtsFound = courts.length === 0;

  const getAllCourts = async () => {
    try {
      setIsLoadingCourts(true);
      const courtsDataResponse = await apiClient<CourtsResponse[]>(
        "/api/canchas"
      );
      const dataFormateada = formatearRespuesta(courtsDataResponse);
      setCourts(dataFormateada);
      setInitialCourts(dataFormateada);
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
    <>
      <div className="w-full px-15 mx-auto flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Escenarios Disponibles</h1>
        <div className="flex gap-2 items-end">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/forma-thin/24/search.png"
            alt="search"
          />
          <input
            type="text"
            className="border-b px-3 py-1 hover:outline-0 focus:outline-0"
            placeholder="Busca por nombre..."
            value={inputValue}
            onChange={(e) => {
              const { value } = e.target;
              if (!value) {
                setCourts(initialCourts);
                setInputValue(value);
                return;
              }
              setInputValue(value);
              setCourts((prev) =>
                prev.filter((court) => {
                  return court.name.toLowerCase().includes(value);
                })
              );
            }}
          />
        </div>
      </div>
      {isLoadingCourts && (
        <div className="w-4/5 mx-auto p-4">
          <div className="animate-pulse space-x-4">
            <div className="grid grid-cols-3 gap-5">
              <div className="h-50 2xl:h-70 rounded-3xl bg-gray-300" />
              <div className="h-50 2xl:h-70 rounded-3xl bg-gray-300" />
              <div className="h-50 2xl:h-70 rounded-3xl bg-gray-300" />
              <div className="h-50 2xl:h-70 rounded-3xl bg-gray-300" />
              <div className="h-50 2xl:h-70 rounded-3xl bg-gray-300" />
              <div className="h-50 2xl:h-70 rounded-3xl bg-gray-300" />
            </div>
          </div>
        </div>
      )}
      {noCourtsFound && (
        <div className=" h-50 flex flex-col justify-center items-center gap-1">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/keek-line/48/nothing-found.png"
            alt="nothing-found"
          />
          <p className="text-3xl">No se encontraron escenarios.</p>
        </div>
      )}
      {!isLoadingCourts && !noCourtsFound && (
        <div className="flex flex-wrap justify-between px-15 gap-4">
          {courts.map(({ id, address, name, img, type, price }) => (
            <div
              className="bg-custom-white m-2 flex flex-col items-start rounded-[20px] shadow-lg max-w-[400px] w-[280px]"
              key={id}
            >
              <div className="relative w-full h-40">
                <img
                  src={img}
                  alt="imagen-cancha"
                  className="rounded-t-3xl object-cover w-full h-full"
                />
                <div className="bg-green-light px-2 py-1 rounded-lg font-medium absolute -bottom-3 left-2.5 text-sm">
                  {type}
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-3 p-5 h-fit">
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-xl font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {name}
                  </p>
                  <div className="flex items-center gap-1 max-w-full">
                    <img
                      width="16"
                      height="16"
                      src="https://img.icons8.com/forma-thin/24/marker.png"
                      alt="marker"
                      className="object-contain"
                    />
                    <p className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      {address}
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col leading-0 gap-1.5 mb-3">
                    <p className="text-xl font-semibold">
                      {formatoCOP.format(Number(price)).replace(/\s/g, "")}
                    </p>
                    <p className="text-gray-500">Por hora</p>
                  </div>
                  <button
                    className="bg-green-dark text-custom-white text-lg px-0.5 py-1 rounded-2xl w-1/2 cursor-pointer hover:scale-102 transition duration-75"
                    onClick={() => push(`escenarios/${id}`)}
                  >
                    <div className="pb-1">Ir a reservar</div>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="w-[280px]"></div>
          <div className="w-[280px]"></div>
        </div>
      )}
    </>
  );
};

export default Page;
