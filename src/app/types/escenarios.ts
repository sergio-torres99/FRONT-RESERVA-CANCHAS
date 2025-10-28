export type Court = {
  id: string;
  name: string;
  address: string;
  price: string;
  img: string;
};

export type CourtsResponse = {
  id: string;
  nombre: string;
  tipoCancha: string;
  precioPorHora: number;
};
