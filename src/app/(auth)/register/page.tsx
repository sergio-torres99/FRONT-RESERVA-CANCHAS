import RegisterForm from "../../components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="py-5 px-15 2xl:p-25 rounded-xl bg-custom-white 2xl:w-240 flex flex-col gap-1 2xl:gap-2 2xl:justify-center shrink h-full overflow-y-auto">
      <h1 className="text-4xl 2xl:text-5xl font-bold text-green-dark">Crear cuenta</h1>
      <p className="text-lg text-green-dark mb-3 2xl:mb-5">
        Crea tu cuenta para empezar a reservar canchas
      </p>
      <RegisterForm />
    </div>
  );
}
