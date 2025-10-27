"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Componente principal de la página de inicio (ruta '/')
export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      push("/dashboard");
    }
  }, [push]);

  return (
    <div className="w-full h-screen bg-custom-white flex flex-col">
      <div className="w-full h-full absolute px-6 pt-20 pb-5 rounded-3xl ">
        <div className="relative w-full h-full inset-0">
          <img
            src="soccer-image.jpg"
            alt=""
            className="w-full h-full object-cover rounded-3xl opacity-80 -z-10"
          />
          <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
        </div>
      </div>
      <div className="p-5 flex justify-between z-10">
        <span className="text-green-dark font-extrabold text-4xl md:text-5xl">ORBIX</span>
        <Link
          href="/login"
          className="bg-green-dark text-custom-white py-2 pb-3 px-5 rounded-4xl hover:scale-105 transition duration-150 cursor-pointer text-lg md:text-xl font-normal"
        >
          Iniciar Sesión
        </Link>
      </div>
      <div className="w-4/6 md:w-2/3 mx-auto text-left md:text-center flex-1 flex flex-col items-center justify-center gap-10 md:gap-15 z-10 text-custom-white ">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
          Reserva Fácil y sin enredos. Gestiona tus reservas en un mismo lugar.
        </h2>
        <p className="text-md md:text-2xl text-left md:text-center">
          Encuentra, agenda y disfruta tu cancha favorita en segundos. Olvídate
          de llamadas o complicaciones: con nosotros, reservar es rápido, seguro
          y sin estrés.
        </p>
        <Link
          href="/register"
          className="bg-custom-white text-green-dark p-1 rounded-4xl hover:scale-105 transition duration-150 cursor-pointer font-normal flex items-center gap-4 pl-5"
        >
          <p className="mb-1 font-semibold text-lg md:text-2xl">Crear cuenta</p>
          <div className="bg-green-dark rounded-3xl p-2">
            <img
              src="right-arrow.png"
              alt="right-arrow"
              className="w-5 h-5 md:w-6 md:h-6"
              // width={25}
              // height={25}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
