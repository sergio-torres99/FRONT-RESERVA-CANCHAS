// src/app/(auth)/layout.tsx
import React from "react";

/**
 * Layout para las rutas de autenticación (Login, Register).
 * Proporciona un contenedor simple y centrado, sin la navegación principal.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen bg-custom-white rounded-3xl p-5">
      <div className="w-full h-full absolute inset-0 rounded-3xl p-5">
        <div className="relative w-full h-full inset-0">
          <img
            src="soccer-image.jpg"
            alt=""
            className="w-full h-full object-cover rounded-3xl opacity-80 -z-10"
          />
          <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
        </div>
      </div>
      <div className="relative flex w-full h-full justify-between items-center p-5">
        <div className="ml-7 lg:ml-15 text-custom-white">
          <p className="text-6xl lg:text-8xl font-bold">ORBIX</p>
          <p className="text-xl lg:text-2xl">
            Organiza tus reservas de forma simple y eficiente
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
