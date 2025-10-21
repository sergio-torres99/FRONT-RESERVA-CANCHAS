// src/types/auth.ts

// 1. Tipo para la información que se envía al endpoint /api/auth/register
export interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  identificacion: string;
  telefono: string;
}

// 2. Tipo para la información que se envía al endpoint /api/auth/login
export interface LoginData {
  email: string;
  password: string;
}

// 3. Tipo para la respuesta exitosa que la API debería dar después del login.
// (Asumimos que la API devuelve un string con el token)
export type AuthResponse = string;

// 4. Tipo para el objeto de usuario (Ajusta esto según la respuesta de /api/me)
export interface User {
  name: string;
  id: number;
  // Añade aquí más campos (ej: role)
}
