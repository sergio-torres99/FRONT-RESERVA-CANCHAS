const CourtIndications = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-2xl">
        Indicaciones para la reserva de canchas
      </h3>
      <ol className="list-decimal list-inside font-bold flex flex-col gap-3">
        <li className="font-bold">
          Reserva anticipada:
          <span className="font-normal ml-1.5">
            Realiza tu reserva con al menos 1 día de anticipación vía web,
            teléfono o en recepción.
          </span>
        </li>
        <li className="font-bold">
          Duración y puntualidad:
          <span className="font-normal ml-1.5">
            Cada turno dura 60 minutos. Se recomienda llegar 15 minutos
            antes del horario reservado.
          </span>
        </li>
        <li className="font-bold">
          Cancelaciones:
          <span className="font-normal ml-1.5">
            Puedes cancelar o reprogramar con 1 día de aviso. Pasado ese
            plazo, se cobrará el turno.
          </span>
        </li>
        <li className="font-bold">
          Uso de la cancha:
          <span className="font-normal ml-1.5">
            Usa calzado adecuado, no se permite fumar ni ingresar con bebidas
            alcohólicas. Cuida las instalaciones.
          </span>
        </li>
        <li className="font-bold">
          Clima:
          <span className="font-normal ml-1.5">
            Si las condiciones no permiten jugar, podrás reprogramar sin costo.
          </span>
        </li>
      </ol>
    </div>
  );
};

export default CourtIndications;
