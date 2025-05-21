"use client";

import { useEffect, useState } from "react";

interface HeaderProps {
  name: string;
}
export default function Header({ name }: Readonly<HeaderProps>) {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setCity("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        setCity(
          data.address?.city ??
            data.address?.town ??
            data.address?.village ??
            "Cidade não encontrada"
        );
      },
      () => {
        setCity("Permissão de localização negada.");
      }
    );
  }, []);
  return (
    <header className="flex items-center justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <h2>Olá, {name}!</h2>
      <p>{city}</p>
    </header>
  );
}
