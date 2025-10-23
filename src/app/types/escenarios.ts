export type Court = {
  id: string;
  name: string;
  address: string;
  description: string;
  price: string;
  img: string;
  available_date: {
    date: string;
    time_slots: string[];
  };
};
