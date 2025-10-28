"use client";
import Link from "next/link";
import { ReactNode } from "react";
import SidebarLink from "../components/SidebarLink";
import { useAuth } from "../context/AuthContext";
import { sidebarOptions } from "../utils/constants";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 flex-shrink-0 bg-green-dark p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <Link
            href="/dashboard"
            className="text-4xl font-extrabold text-center text-background-light tracking-wider text-custom-white block"
          >
            ORBIX
          </Link>
          <hr className="my-5 p-2 text-custom-white/20"/>
          <ul className="space-y-2 flex flex-col">
            {sidebarOptions.map((opt) => (
              <SidebarLink key={opt.path} href={opt.path}>
                {opt.label}
              </SidebarLink>
            ))}
          </ul>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center space-x-3 w-full px-4 py-3 rounded-4xl bg-green-light text-text-secondary font-semibold hover:scale-102 transition duration-150 cursor-pointer"
        >
          <span>Cerrar Sesión</span>
        </button>
      </aside>
      <main className="flex-1 flex flex-col bg-green-dark pl-0">
        <div className="flex-grow bg-custom-white rounded-tl-4xl rounded-bl-4xl p-6 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
