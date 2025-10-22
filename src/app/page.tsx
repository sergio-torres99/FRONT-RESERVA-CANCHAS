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
    // Contenedor principal centrado
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-primary">
      {/* Título y descripción */}
      <h1 className="text-4xl font-extrabold text-secondary mb-4">
        Gestor de Reserva de Canchas
      </h1>
      <p className="text-xl text-secondary mb-10">
        Comienza creando una cuenta o iniciando sesión.
      </p>

      {/* Contenedor de botones de navegación */}
      <div className="flex space-x-6">
        {/* Enlace al Registro */}
        <Link
          href="/register"
          className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg shadow-md hover:bg-secondary/70 transition duration-150"
        >
          Crear Cuenta
        </Link>

        {/* Enlace al Login */}
        <Link
          href="/login"
          className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg shadow-md hover:bg-secondary/70 transition duration-150"
        >
          Iniciar Sesión
        </Link>
      </div>
    </main>
  );
}
