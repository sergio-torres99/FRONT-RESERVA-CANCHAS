export type Court = {
  id: number;
  name: string;
  address: string;
  price: string;
  img: string;
  type: string;
};

export type CourtsResponse = {
  id: number;
  nombre: string;
  tipoCancha: string;
  precioPorHora: number;
  imagenURL: string;
  ubicacion: string;
};
