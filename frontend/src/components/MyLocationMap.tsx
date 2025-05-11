'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

export default function MyLocationMap() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Erro ao obter localização:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error('Geolocalização não suportada pelo navegador');
        }
    }, []);

    if (!isLoaded || !location) return <p>Carregando mapa...</p>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
            <Marker position={location} />
        </GoogleMap>
    );
}
