import Link from 'next/link';

// Componente principal de la página de inicio (ruta '/')
export default function HomePage() {
  return (
    // Contenedor principal centrado
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      
      {/* Título y descripción */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Sistema de Reserva de Canchas ⚽
      </h1>
      <p className="text-xl text-gray-600 mb-10">
        Comienza creando una cuenta o iniciando sesión.
      </p>

      {/* Contenedor de botones de navegación */}
      <div className="flex space-x-6">
        
        {/* Enlace al Registro */}
        <Link 
          href="/register"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150"
        >
          Crear Cuenta
        </Link>
        
        {/* Enlace al Login */}
        <Link 
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          Iniciar Sesión
        </Link>
        
      </div>
    </main>
  );
}