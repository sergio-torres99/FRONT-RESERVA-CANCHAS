"use client";

import React, { useState } from "react";
import { RegisterData } from "../../types/auth"; // Importamos la interfaz de datos
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importamos el router para redirigir

// URL base de tu API de Spring Boot
// ¡Asegúrate de que el backend esté corriendo en http://localhost:8080!
const API_URL = "http://localhost:8080/api/auth/register";

// Estado inicial del formulario
const initialData: RegisterData = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  identificacion: "",
  telefono: "",
};

const RegisterForm: React.FC = () => {
  const router = useRouter(); // Inicializamos el hook de navegación

  // Estados del formulario y la petición
  const [formData, setFormData] = useState<RegisterData>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Manejador de Cambios: Actualiza el estado con cada tecla
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // La clave [name] usa el nombre del input para actualizar la propiedad correcta
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador de Envío: Conecta con la API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convierte el objeto JavaScript a JSON string
      });

      // La API de Spring Security suele devolver un mensaje en caso de éxito.
      if (response.ok) {
        setSuccess("¡Registro exitoso! Serás redirigido para iniciar sesión.");

        // Redirige después de 2 segundos.
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Lee el mensaje de error que envía el backend (ej. "El email ya existe")
        const errorText = await response.text();
        // Si el backend devuelve un texto de error, úsalo. Si no, usa un genérico.
        setError(
          errorText || "Ocurrió un error desconocido durante el registro."
        );
      }
    } catch (error) {
        console.error(error)
      // Esto captura errores de red (API apagada o CORS)
      setError(
        "Error de conexión. Verifica que el servidor de Spring Boot esté corriendo."
      );
    } finally {
      setIsLoading(false); // Siempre desactiva la carga al finalizar
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 2xl:space-y-4">
      {/* Mensajes de Estado (Éxito y Error) */}
      {success && (
        <p className="p-3 bg-green-100 text-green-700 rounded-4xl font-medium">
          {success}
        </p>
      )}
      {error && (
        <p className="p-3 bg-red-100 text-red-700 rounded-4xl font-medium whitespace-pre-wrap">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Campo Nombre */}
        <div className="flex flex-col gap-1 2xl:gap-3">
          <label
            htmlFor="nombre"
            className="block text-md 2xl:text-lg font-medium text-green-dark"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus:outline-none"
          />
        </div>

        {/* Campo Apellido */}
        <div className="flex flex-col gap-1 2xl:gap-3">
          <label
            htmlFor="apellido"
            className="block text-md 2xl:text-lg font-medium text-green-dark"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus:outline-none"
          />
        </div>
      </div>

      {/* Campo Email */}
      <div className="flex flex-col gap-1 2xl:gap-3">
        <label
          htmlFor="email"
          className="block text-md 2xl:text-lg font-medium text-green-dark"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus:outline-none"
        />
      </div>

      {/* Campo Contraseña */}
      <div className="flex flex-col gap-1 2xl:gap-3">
        <label
          htmlFor="password"
          className="block text-md 2xl:text-lg font-medium text-green-dark"
        >
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus:outline-none"
        />
      </div>

      {/* Campo Identificación */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 2xl:gap-3">
          <label
            htmlFor="identificacion"
            className="block text-md 2xl:text-lg font-medium text-green-dark"
          >
            Identificación:
          </label>
          <input
            type="text"
            id="identificacion"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            required
            className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus:outline-none"
          />
        </div>

        {/* Campo Teléfono */}
        <div className="flex flex-col gap-1 2xl:gap-3">
          <label
            htmlFor="telefono"
            className="block text-md 2xl:text-lg font-medium text-green-dark"
          >
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus:outline-none"
          />
        </div>
      </div>

      {/* --- BOTONES DE ACCIÓN --- */}
      <div className="pt-2 flex flex-col gap-2 2xl:gap-5 items-center mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-1/2 py-2 px-4 font-semibold rounded-4xl shadow-md transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-dark hover:bg-green-dark/70 cursor-pointer"
          } text-custom-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {isLoading ? "Registrando..." : "Registrar"}
        </button>

        {/* Botón de Regresar/Login */}
        <p className="flex gap-2">
          ¿Ya tienes una cuenta?
          <Link
            href="/login"
            className="font-semibold hover:scale-102 transition duration-75 text-green-dark"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
