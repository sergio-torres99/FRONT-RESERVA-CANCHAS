import RegisterForm from "../../components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="p-25 rounded-xl bg-custom-white w-180 flex flex-col gap-2 justify-center shrink h-full">
      <h1 className="text-5xl font-bold text-green-dark">Crear cuenta</h1>
      <p className="text-lg text-green-dark mb-5">
        Crea tu cuenta para empezar a reservar canchas
      </p>
      <RegisterForm />
    </div>
  );
}
