'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

export default function MyLocationMap() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocalização não é suportada pelo navegador');
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                if (accuracy <= 100) {
                    setLocation({ lat: latitude, lng: longitude });
                }
            },
            (err) => {
                setError('Erro ao obter localização: ' + err.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    if (error) return <p>{error}</p>;
    if (!isLoaded || !location) return <p>Carregando mapa com sua localização atual...</p>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={16}>
            <Marker position={location} />
        </GoogleMap>
    );
}
