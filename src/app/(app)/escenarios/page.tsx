"use client";
import { Court } from "@/app/types/escenarios";
import { escenariosData } from "@/app/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isLoadingCourts, setIsLoadingCourts] = useState(false);
  const { push } = useRouter();

  const getAllCourts = async () => {
    try {
      setIsLoadingCourts(true);
      // const token = localStorage.getItem("authToken");
      // const response = await fetch(`${API_BASE_URL}/api/canchas`, {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const courtsData = await response.json();

      await new Promise((res) =>
        setTimeout(() => {
          setCourts(escenariosData);
          res([]);
        }, 2000)
      );
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
          courts.map((c) => (
            <div
              className="m-2 flex flex-col items-center rounded-3xl gap-4 shadow-lg border pb-4 border-gray-300 max-w-[500px]"
              key={c.address}
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
                <p className="text-3xl font-medium">{c.name}</p>
                <p>{c.address}</p>
              </div>
              <button
                className="bg-green-dark text-custom-white text-xl px-4 py-2 mt-2 rounded-4xl w-1/2 cursor-pointer hover:scale-102 transition duration-75"
                onClick={() => push(`escenarios/${c.id}`)}
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
