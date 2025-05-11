'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

type Location = { lat: number; lng: number } | null;

interface LocationContextProps {
  location: Location;
  error: string | null;
  isLoaded: boolean;
}

const LocationContext = createContext<LocationContextProps>({
  location: null,
  error: null,
  isLoaded: false,
});

export function LocationProvider({ children }: { readonly children: React.ReactNode }) {
  const [location, setLocation] = useState<Location>(null);
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
      ({ coords: { latitude, longitude, accuracy } }) => {
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
  const contextValue = useMemo(
    () => ({ location, error, isLoaded }),
    [location, error, isLoaded]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  )
};

export const useLocation = () => useContext(LocationContext);
