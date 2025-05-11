'use client';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useLocation } from '@/contexts/LocationContext';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
};

export default function MyLocationMap() {
    const { location, error, isLoaded } = useLocation();
    if (error) return <p>{error}</p>;
    if (!isLoaded || !location) return <p>Carregando mapa com sua localização atual...</p>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={16}>
            <Marker position={location} />
        </GoogleMap>
    );
}
