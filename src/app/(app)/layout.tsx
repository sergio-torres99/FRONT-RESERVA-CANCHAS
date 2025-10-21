"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

type SidebarItems = "dashboard" | "mis_reservas" | "escenarios";

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  id: SidebarItems;
  onClick?: () => void;
  selectedItem?: SidebarItems;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  children,
  onClick,
  id,
  selectedItem,
}) => (
  <li>
    <Link
      onClick={() => onClick?.()}
      href={href}
      className={`flex items-center space-x-3 w-100 px-4 py-3 rounded-xl text-custom-white font-semibold  hover:bg-custom-white/30 hover:text-text-secondary transition duration-150 ${
        selectedItem === id ? "bg-custom-white text-text-secondary hover:bg-custom-white/100" : ""
      }`}
    >
      <span>{children}</span>
    </Link>
  </li>
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<SidebarItems>("dashboard");
  // 2. Usamos el hook para acceder a las funciones del AuthProvider
  const { logout } = useAuth(); // Obtenemos el usuario y la función logout

  // 3. La función de Logout ahora llama directamente a la función real del Contexto.
  // Ya no necesitamos la función 'handleLogout' simulada.

  return (
    <div className="flex h-screen bg-background-light">
      <aside className="w-64 flex-shrink-0 bg-green-dark p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h2 className="text-4xl font-extrabold text-center text-background-light tracking-wider text-custom-white">
            ORBIX
          </h2>
          <hr className="my-5 p-2" style={{ color: "#44BE67" }} />
          <ul className="space-y-4 flex flex-col">
            <SidebarLink
              href="/dashboard"
              onClick={() => setSelectedItem("dashboard")}
              id="dashboard"
              selectedItem={selectedItem}
            >
              Dashboard
            </SidebarLink>
            <SidebarLink
              href="/mis-reservas"
              onClick={() => setSelectedItem("mis_reservas")}
              id="mis_reservas"
              selectedItem={selectedItem}
            >
              Mis Reservas
            </SidebarLink>
            <SidebarLink
              href="/escenarios"
              onClick={() => setSelectedItem("escenarios")}
              id="escenarios"
              selectedItem={selectedItem}
            >
              Escenarios
            </SidebarLink>
          </ul>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center space-x-3 w-full px-4 py-3 rounded-xl bg-green-light text-custom-white font-semibold hover:bg-custom-white hover:text-text-secondary transition duration-150 cursor-pointer"
        >
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto bg-custom-white">
        <div className="flex-grow p-6 bg-custom-white">{children}</div>
      </main>
    </div>
  );
}
