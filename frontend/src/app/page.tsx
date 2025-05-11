'use client';
import MyLocationMap from '@/components/MyLocationMap';
import { useLocation } from '@/contexts/LocationContext';
import { filterNearbyPlaces } from '@/hooks';
import { IPlace } from '@core';

const allPlaces: IPlace[] = [];
export default function Home() {
  const { location, isLoaded, error } = useLocation();

  if (!isLoaded || !location) return <p>Carregando localização...</p>;

  const nearbyPlaces = filterNearbyPlaces({
    userLocation: location,
    places: allPlaces,
    filters: { type: 'hotel', minRating: 4 },
    maxDistanceKm: 5,
  });
  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-start py-24 px-16">
      <section className='w-full  flex gap-5 h-screen'>
        <aside className='w-1/4 h-full'>
          {nearbyPlaces.map((place) => (
            <li key={place.id}>{place.name} - {place.averageRating}⭐</li>
          ))}
        </aside>
        <div className='w-3/4 h-full '><MyLocationMap location={location} error={error}  /></div>
      </section>
    </main>
  );
}
