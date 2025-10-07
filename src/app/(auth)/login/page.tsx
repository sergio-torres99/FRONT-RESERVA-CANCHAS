import LoginForm from '../../components/forms/LoginForm';

export default function LoginPage() {
    return (
        <div className="mx-auto max-w-md p-8 mt-10 border border-primary rounded-xl shadow-lg bg-secondary">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">Acceder a tu Cuenta</h1>
            <LoginForm />
        </div>
    );
}