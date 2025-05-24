'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '800px'
};

export function GoogleMapNearby() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => {
                    console.error('Erro ao obter localização', err);
                }
            );
        }
    }, []);

    const handleMapLoad = (map: google.maps.Map) => {
        if (!location) return;

        const service = new google.maps.places.PlacesService(map);
        const request: google.maps.places.PlaceSearchRequest = {
            location,
            radius: 1000,
            type: 'restaurant', // ou 'bar', 'store', etc.
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                setPlaces(results);
            }
        });
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Mapa com Locais Próximos</h2>
            {location ? (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={['places']}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={location}
                        zoom={15}
                        onLoad={handleMapLoad}
                    >
                        <Marker position={location} />
                        {places.map((place, index) =>
                            place.geometry?.location ? (
                                <Marker
                                    key={index}
                                    position={{
                                        lat: place.geometry.location.lat(),
                                        lng: place.geometry.location.lng(),
                                    }}
                                    label={place.name}
                                />
                            ) : null
                        )}
                    </GoogleMap>
                </LoadScript>
            ) : (
                <p>Carregando localização...</p>
            )}
        </div>
    );
}
