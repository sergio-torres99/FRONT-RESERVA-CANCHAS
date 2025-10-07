'use client';

import React, { useState } from 'react';
import { RegisterData } from '../../types/auth'; // Importamos la interfaz de datos
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importamos el router para redirigir

// URL base de tu API de Spring Boot
// ¡Asegúrate de que el backend esté corriendo en http://localhost:8080!
const API_URL = 'http://localhost:8080/api/auth/register';

// Estado inicial del formulario
const initialData: RegisterData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    identificacion: '',
    telefono: '',
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convierte el objeto JavaScript a JSON string
            });

            // La API de Spring Security suele devolver un mensaje en caso de éxito.
            if (response.ok) {
                setSuccess('¡Registro exitoso! Serás redirigido para iniciar sesión.');

                // Redirige después de 2 segundos.
                setTimeout(() => {
                    router.push('/login');
                }, 2000);

            } else {
                // Lee el mensaje de error que envía el backend (ej. "El email ya existe")
                const errorText = await response.text();
                // Si el backend devuelve un texto de error, úsalo. Si no, usa un genérico.
                setError(errorText || 'Ocurrió un error desconocido durante el registro.');
            }
        } catch (err) {
            // Esto captura errores de red (API apagada o CORS)
            setError('Error de conexión. Verifica que el servidor de Spring Boot esté corriendo.');
        } finally {
            setIsLoading(false); // Siempre desactiva la carga al finalizar
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Mensajes de Estado (Éxito y Error) */}
            {success && (
                <p className="p-3 bg-green-100 text-green-700 rounded-md font-medium">{success}</p>
            )}
            {error && (
                <p className="p-3 bg-red-100 text-red-700 rounded-md font-medium whitespace-pre-wrap">{error}</p>
            )}

            {/* --- CAMPOS DEL FORMULARIO --- */}
            {/* Nota: Todos los inputs usan value={formData.[nombre]} y onChange={handleChange}. 
        Esto se llama 'Controlled Component' en React.
      */}

            {/* Campo Nombre */}
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-primary">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="mt-1 block w-full border border-primary rounded-md shadow-sm p-2 focus:outline-none" />
            </div>

            {/* Campo Apellido */}
            <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-primary">Apellido:</label>
                <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required className="mt-1 block w-full border border-primary rounded-md shadow-sm p-2 focus:outline-none" />
            </div>

            {/* Campo Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-primary rounded-md shadow-sm p-2 focus:outline-none" />
            </div>

            {/* Campo Contraseña */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary">Contraseña:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full border border-primary rounded-md shadow-sm p-2 focus:outline-none" />
            </div>

            {/* Campo Identificación */}
            <div>
                <label htmlFor="identificacion" className="block text-sm font-medium text-primary">Identificación:</label>
                <input type="text" id="identificacion" name="identificacion" value={formData.identificacion} onChange={handleChange} required className="mt-1 block w-full border border-primary rounded-md shadow-sm p-2 focus:outline-none" />
            </div>

            {/* Campo Teléfono */}
            <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-primary">Teléfono:</label>
                <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required className="mt-1 block w-full border border-primary rounded-md shadow-sm p-2 focus:outline-none" />
            </div>

            {/* --- BOTONES DE ACCIÓN --- */}
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 font-semibold rounded-md shadow-md transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/70 cursor-pointer'
                        } text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                    {isLoading ? 'Registrando...' : 'Registrar'}
                </button>

                {/* Botón de Regresar/Login */}
                <Link
                    href="/login"
                    className="block text-center mt-3 w-full py-2 px-4 bg-primary text-secondary font-semibold rounded-md shadow-md hover:bg-primary/70 transition"
                >
                    Iniciar Sesión
                </Link>

            </div>
        </form>
    );
};

export default RegisterForm;