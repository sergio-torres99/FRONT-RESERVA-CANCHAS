// src/app/(auth)/layout.tsx
import React from 'react';

/**
 * Layout para las rutas de autenticación (Login, Register).
 * Proporciona un contenedor simple y centrado, sin la navegación principal.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        // min-h-screen: Altura mínima de la pantalla
        // flex items-center justify-center: Centra el contenido vertical y horizontalmente
        // bg-gray-100: Fondo gris claro para darle contraste
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            {/* Contenedor del formulario */}
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl">

                {/* Logo/Título Central */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-teal-600">ORBIX</h1>
                    <p className="text-gray-500 mt-1">Gestión de Canchas</p>
                </div>

                {children} {/* Aquí se insertará el formulario de Login o Register */}
            </div>
        </div>
    );
}