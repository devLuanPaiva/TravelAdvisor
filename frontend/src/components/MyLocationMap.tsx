'use client';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
};

interface MyLocationMapProps {
    location: { lat: number; lng: number }
    error: string | null;
}
export default function MyLocationMap({ location, error }: Readonly<MyLocationMapProps>) {
    if (error) return <p>{error}</p>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={16}>
            <Marker position={location} />
        </GoogleMap>
    );
}
