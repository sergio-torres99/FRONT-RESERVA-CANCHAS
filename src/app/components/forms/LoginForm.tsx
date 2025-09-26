'use client';

import React, { useState } from 'react';
import { LoginData } from '../../types/auth'; // Usamos el tipo para email y password
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Estado inicial: solo necesitamos email y password
const initialData: LoginData = {
    email: '',
    password: '',
};

const LoginForm: React.FC = () => {
    const router = useRouter();

    // Estados para el formulario y la petición
    const [formData, setFormData] = useState<LoginData>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Manejador de Cambios (similar al de Register)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Manejador de Envío: Obtiene el token JWT
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // El endpoint de Login de tu API de Spring Boot
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // El backend responde con el TOKEN JWT como texto plano (string)
                const jwtToken = await response.text();

                // PASO CLAVE: Guardar el token en Local Storage
                localStorage.setItem('jwtToken', jwtToken);

                // Redirigir al usuario a la vista de canchas (la primera ruta protegida)
                router.push('/canchas');

            } else if (response.status === 401) {
                // Maneja credenciales incorrectas
                setError('Credenciales incorrectas. Verifica tu email y contraseña.');
            } else {
                // Otros errores del servidor
                const errorText = await response.text();
                setError(errorText || 'Ocurrió un error al iniciar sesión.');
            }

        } catch (err) {
            // Error de conexión o CORS
            setError('Error de conexión. ¿Está el backend encendido?');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Mostrar mensajes de error */}
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