"use client";
import MyLocationMap from "@/components/MyLocationMap";
import NearbyRestaurants from "@/components/NearbyRestaurants";
import { useLocation } from "@/contexts/LocationContext";
import { useNearbyPlaces } from "@/hooks";

export default function Home() {
  const { location, isLoaded, error } = useLocation();
  const {
    places,
    loading,
    error: placesError,
  } = useNearbyPlaces({ city: "Sao Paulo" });

  if (!isLoaded || !location) return <p>Carregando localização...</p>;
  if (loading) return <p>Buscando locais próximos...</p>;
  if (placesError) return <p>Erro: {placesError}</p>;

  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-start py-24 px-16">
      <NearbyRestaurants />
    </main>
  );
}
