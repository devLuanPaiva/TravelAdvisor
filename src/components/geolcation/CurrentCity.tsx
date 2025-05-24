'use client'
import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

export function CurrentCity() {
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
        <p className="flex items-center gap-1">
            {city} <MdLocationOn />
        </p>

    );
}