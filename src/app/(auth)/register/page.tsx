import RegisterForm from '../../components/forms/RegisterForm';

export default function RegisterPage() {
    return (
        // Hemos reemplazado los estilos inline con clases básicas de Tailwind
        <div className="mx-auto max-w-md p-8 mt-10 border border-primary rounded-xl shadow-lg bg-secondary">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">Crear Cuenta</h1>
            <RegisterForm />
        </div>
    );
}