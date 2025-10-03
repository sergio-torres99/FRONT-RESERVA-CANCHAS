import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from './context/AuthContext'; 

export const metadata: Metadata = {
  title: "Reserva Canchas | ORBIX",
  description: "Sistema de reserva de canchas ORBIX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {/* ENVOLVEMOS la aplicación con el AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}