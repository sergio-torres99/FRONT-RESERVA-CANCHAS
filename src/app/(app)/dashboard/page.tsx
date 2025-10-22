"use client";
import { useAuth } from "@/app/context/AuthContext";
import React from "react";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <header className="p-5 flex justify-between items-center sticky top-0 z-10">
        <div className="text-3xl text-text-dark font-medium capitalize">
          Hola, {user?.name}
        </div>
      </header>
    </div>
  );
}
