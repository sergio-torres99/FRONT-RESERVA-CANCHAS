export type MyBooking = {
  id: number;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  usuarioId: number;
  canchaId: number;
  nombre?: string;
  precioPorHora?: number;
  tipoCancha?: string;
};