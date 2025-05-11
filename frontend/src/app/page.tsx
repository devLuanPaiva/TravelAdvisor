'use client'
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin} from '@vis.gl/react-google-maps';
import { useState } from 'react';

export default function Home() {
  const position = { lat: 37.7749, lng: -122.4194 };
  const apiKey = process.env.NEXT_PUBLIC_GOOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_MAP_ID;
  const [open, setOpen] = useState(false);

  if (!apiKey) throw new Error('API key is not defined');

  return (
    <section>
      <h1>Add Google Maps and Places</h1>
      <APIProvider apiKey={apiKey}>
        <div style={{ width: '100%', height: '500px' }}>
          <Map
            center={position}
            zoom={12}
            mapId={mapId}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            <AdvancedMarker position={position} onClick={() => setOpen(!open)}>
              <Pin
                background="gray"
                borderColor="green"
                glyphColor="purple"
              />
            </AdvancedMarker>

            {open && (
              <InfoWindow position={position}>
                <p>I&apos;m here</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </section>
  );
}
