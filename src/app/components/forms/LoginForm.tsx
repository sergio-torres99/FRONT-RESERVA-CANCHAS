// ASUME QUE ESTÁ UBICADO EN src/components/forms/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import { LoginData, User } from '../../types/auth'; // Asegúrate de que 'User' también esté importado aquí
import Link from 'next/link';

// Importamos el hook useAuth para usar la función de login global
import { useAuth } from '../../context/AuthContext';

// Estado inicial
const initialData: LoginData = {
    email: '',
    password: '',
};

// URL base de tu API
const API_BASE_URL = 'http://localhost:8080';

const LoginForm: React.FC = () => {
    // 1. OBTENER LA FUNCIÓN LOGIN DEL CONTEXTO
    const { login } = useAuth();

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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            // 2. Esperamos un JSON (token y datos de usuario)
            const data = await response.json();

            if (response.ok) {
                // ÉXITO: El backend devolvió { token: "...", user: {...} }
                const jwtToken: string = data.token;
                const userData: User = { name: data.nombre };
                // Llamamos a la función global de login
                login(jwtToken, userData);

            } else if (response.status === 401) {
                setError('Credenciales incorrectas. Verifica tu email y contraseña.');
            } else {
                setError(data.message || 'Ocurrió un error al iniciar sesión.');
            }

        } catch (err) {
            console.error('Login error:', err);
            setError('Error de conexión. ¿Está el backend encendido?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... (El resto de la interfaz del formulario permanece igual) ... */}

            {error && (
                <p className="p-3 bg-red-100 text-red-700 rounded-md font-medium">{error}</p>
            )}

            {/* --- CAMPO EMAIL --- */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            {/* --- CAMPO CONTRASEÑA --- */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            {/* --- BOTONES DE ACCIÓN --- */}
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 font-semibold rounded-md shadow-md transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                        } text-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>

                {/* Botón de Regresar/Registrar */}
                <Link
                    href="/register"
                    className="block text-center mt-3 w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-300 transition"
                >
                    Crear una Cuenta
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;