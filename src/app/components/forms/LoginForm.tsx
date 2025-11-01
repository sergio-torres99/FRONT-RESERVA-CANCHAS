// ASUME QUE ESTÁ UBICADO EN src/components/forms/LoginForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { LoginData, User } from "../../types/auth"; // Asegúrate de que 'User' también esté importado aquí
import Link from "next/link";

// Importamos el hook useAuth para usar la función de login global
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "@/app/utils/constants";
import { useRouter } from "next/navigation";

// Estado inicial
const initialData: LoginData = {
  email: "",
  password: "",
};

// URL base de tu API

const LoginForm: React.FC = () => {
  // 1. OBTENER LA FUNCIÓN LOGIN DEL CONTEXTO
  const { login } = useAuth();
  const { push } = useRouter();

  // Estados para el formulario y la petición
  const [formData, setFormData] = useState<LoginData>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Petición al endpoint de Login
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Esperamos un JSON (token y datos de usuario)
      const data = await response.json();

      if (response.ok) {
        // ÉXITO: El backend devolvió { token: "...", user: {...} }
        const jwtToken: string = data.token;
        const userData: User = {
          name: data.nombre,
          id: data.id,
          email: data?.email || "",
          lastName: data?.apellido || "",
        };
        // Llamamos a la función global de login
        login(jwtToken, userData);
      } else if (response.status === 401) {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      } else {
        setError(data.message || "Ocurrió un error al iniciar sesión.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión. ¿Está el backend encendido?");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      push("/dashboard");
    }
  }, [push]);

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {error && (
        <p className="p-3 bg-red-100 text-red-700 rounded-md font-medium">
          {error}
        </p>
      )}

      {/* --- CAMPO EMAIL --- */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="email"
          className="block text-lg font-medium text-green-dark"
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
          className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus: outline-none"
        />
      </div>

      {/* --- CAMPO CONTRASEÑA --- */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="password"
          className="block text-lg font-medium text-green-dark"
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
          className="block w-full border border-green-dark rounded-4xl shadow-sm py-2 px-3 focus: outline-none"
        />
      </div>

      {/* --- BOTONES DE ACCIÓN --- */}
      <div className="pt-2 flex  flex-col items-center gap-5">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-1/2 py-2 px-4 font-semibold rounded-4xl shadow-md transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-dark hover:bg-green-dark/90 cursor-pointer"
          } text-custom-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        {/* Botón de Regresar/Registrar */}
        <p className="flex gap-2">
          ¿No tienes una cuenta?
          <Link
            href="/register"
            className="font-semibold hover:scale-102 transition duration-75 text-green-dark"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
