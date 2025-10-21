"use client";
import { useParams } from "next/navigation";

const Cancha = () => {
  const { id } = useParams();
  console.log({ id });
  return <div>Cancha {id}</div>;
};

export default Cancha;
