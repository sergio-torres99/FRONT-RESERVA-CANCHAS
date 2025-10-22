"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Court = {
  id: string;
  name: string;
  address: string;
  description: string;
  price: string;
  time_slots: string[];
  img: string;
};

const defaultCourt: Court = {
  id: "",
  name: "",
  address: "",
  description: "",
  price: "",
  time_slots: [],
  img: "",
};

const mockCourt = {
  id: "c1a2b3d4",
  name: "Cancha Los Pinos",
  address: "Av. Siempre Viva 123, Ciudad Deportiva",
  description:
    "Cancha de fútbol 7 con césped sintético, iluminación nocturna y vestuarios.",
  price: "15.000",
  time_slots: [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
  ],
  img: "/cancha.jpg",
};

const Cancha = () => {
  // const { id }: { id: string } = useParams();
  const { back } = useRouter();
  const [courtData, setCourtData] = useState<Court>(defaultCourt);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const { address, description, name, price, time_slots, img } = courtData;

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
    <>
      <button className="cursor-pointer" onClick={back}>
        <Image
          src="/back-arrow.png"
          alt="arrow-back"
          className="rounded-2xl object-cover"
          width={30}
          height={30}
        />
      </button>
      <div className="w-4/5 mx-auto flex flex-col gap-2">
        {isLoadingData ? (
          <p>Cargando cancha...</p>
        ) : (
          <>
            <div className="relative w-full h-100">
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
            <h1 className="text-4xl">{name}</h1>
            <span>
              <b>Precio:</b> {price}
            </span>
            <p>
              <b>Dirección:</b> {address}
            </p>
            <p className="my-2 font-bold">{description}</p>
            <form>
              <input type="date" />
            </form>
            {time_slots}
          </>
        )}
      </div>
    </>
  );
};

export default Cancha;
