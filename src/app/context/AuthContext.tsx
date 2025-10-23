"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "../types/auth"; // Asegúrate de que 'User' esté definido en types/auth
import { API_BASE_URL } from "../utils/constants";

// Tipos de Datos
// -----------------------------------------------------------

// 2. Tipo para el Contrato del Contexto (AuthContextType)
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// 3. Creación del Contexto
// El tipo de dato es AuthContextType O undefined (para cuando no está inicializado)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Custom Hook para usar el contexto
// -----------------------------------------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// 5. Componente Proveedor (AuthProvider)
// -----------------------------------------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Hook de Next.js para manejar redirecciones

  const isLoggedIn = !!user;

  // A. Función para iniciar sesión (Llamada desde la página de login)
  const login = (token: string, userData: User) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
    router.push("/dashboard"); // Redirige inmediatamente después de un login exitoso
  };

  // B. Función para cerrar sesión (Llamada desde el Header/Sidebar)
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/");
  };

  // C. Lógica para cargar/verificar el token guardado (Sesión Persistente)
  const loadUserFromStorage = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    // Si no hay token guardado, terminamos el chequeo.
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      // Llamada al endpoint de verificación (con el token en el Header)
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Enviamos el token al backend
        },
      });
      console.log(res.ok);

      if (res.ok) {
        // CASO 1: Token Válido (200 OK)
        const data = await res.json();

        console.log(data);
        const userData: User = { name: data.username, id: data.id };
        console.log("Sesión restaurada para el usuario:", userData);
        setUser(userData);
      } else if (res.status === 401 || res.status === 403) {
        // CASO 3: Token Expirado o Inválido (401/403)
        console.warn("Token inválido o expirado. Forzando cierre de sesión.");
        localStorage.removeItem("authToken"); // Eliminamos el token corrupto
        setUser(null);
      }
    } catch (error) {
      // Fallo de red (el servidor no responde)
      console.error(
        "Error de red al verificar la sesión. Token será limpiado.",
        error
      );
      localStorage.removeItem("authToken");
      setUser(null);
    } finally {
      // La carga SIEMPRE debe terminar
      setIsLoading(false);
    }
  }, []); // Array vacío: La función es estable y solo se crea una vez.

  // D. Ejecución del efecto (Controla cuándo ejecutar loadUserFromStorage)
  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]); // Se ejecuta una sola vez al montar (gracias a useCallback)

  // 6. El Proveedor del Contexto (El Objeto de Contrato)
  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
