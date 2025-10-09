'use client';

import React from 'react';
import Link from 'next/link';

// Importamos el hook que nos da acceso a la función real de logout
import { useAuth } from '@/app/context/AuthContext'; // Asumo la ruta: src/app/context/AuthContext

// 1. Definimos la interfaz (tipos) para las propiedades del componente
interface SidebarLinkProps {
    href: string;
    children: React.ReactNode;
}

// Componente de navegación para el Dashboard
const SidebarLink: React.FC<SidebarLinkProps> = ({ href, children }) => (
    <li>
        <Link
            href={href}
            className="flex items-center space-x-3 w-3/4 px-4 py-3 rounded-xl bg-secondary text-primary font-semibold hover:bg-secondary/80 transition duration-150 shadow-md"
        >
            <span>{children}</span>
        </Link>
    </li>
);

// Componente principal del Layout del Dashboard
export default function AppLayout({ children }: { children: React.ReactNode }) {

    // 2. Usamos el hook para acceder a las funciones del AuthProvider
    const { user, logout } = useAuth(); // Obtenemos el usuario y la función logout

    // 3. La función de Logout ahora llama directamente a la función real del Contexto.
    // Ya no necesitamos la función 'handleLogout' simulada.
    const userName = user?.name || 'Usuario'; // Usamos el nombre real si está disponible

    return (
        // Contenedor principal: usa el Beige como fondo general y fija la altura de la pantalla
        <div className="flex h-screen bg-background-light">

            {/* 1. Barra Lateral (Sidebar) */}
            <aside
                className="w-64 flex-shrink-0 bg-primary p-6 flex flex-col justify-between shadow-2xl"
            >
                <div>
                    {/* Logo/Título de la Aplicación */}
                    <h2 className="text-4xl font-extrabold mb-10 mt-2 text-center text-background-light tracking-wider text-secondary">
                        ORBIX
                    </h2>

                    {/* Navegación Principal */}
                    <ul className="space-y-4 flex flex-col">
                        <SidebarLink href="/dashboard">Dashboard</SidebarLink>
                        <SidebarLink href="/dashboard/reservar">Reservar Cancha</SidebarLink>
                        <SidebarLink href="/dashboard/mis-reservas">Mis Reservas</SidebarLink>
                    </ul>
                </div>

                {/* Botón Cerrar Sesión (al fondo de la Sidebar) */}
                <button
                    // 4. Conectamos el onClick directamente a la función logout del contexto
                    onClick={logout}
                    className="flex items-center justify-center space-x-3 w-full px-4 py-3 rounded-xl bg-secondary text-primary font-semibold hover:bg-secondary/80 transition duration-150 shadow-lg cursor-pointer"
                >
                    <span>Cerrar Sesión</span>
                </button>
            </aside>

            {/* 2. Área de Contenido Principal (Main) */}
            <main
                className="flex-1 flex flex-col overflow-y-auto"
            >
                {/* A. Header / Navbar Superior */}
                <header className="p-5 border-b border-secondary/50 shadow-md bg-secondary/50 flex justify-between items-center sticky top-0 z-10">
                    {/* <h1 className="text-2xl font-extrabold text-text-dark">Dashboard</h1> */}
                    <div className="text-lg text-text-dark font-medium">Bienvenido: {userName}</div>
                </header>

                {/* B. Contenido Dinámico de la Ruta */}
                <div className="flex-grow p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
