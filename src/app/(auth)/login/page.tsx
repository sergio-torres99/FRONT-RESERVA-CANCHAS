import LoginForm from '../../components/forms/LoginForm';

export default function LoginPage() {
    return (
        <div className="p-15 2xl:p-25 rounded-xl bg-custom-white 2xl:w-240 flex flex-col gap-1 2xl:gap-2 justify-center shrink h-full">
            <h1 className="text-5xl font-bold text-green-dark">Accede a tu cuenta</h1>
            <p className="text-lg text-green-dark mb-5">Inicia sesión para reservar tu cancha</p>
            <LoginForm />
        </div>  
    );
}   