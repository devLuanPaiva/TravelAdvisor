'use client'
import { useEffect, useState } from "react";

type Place = google.maps.places.PlaceResult;

export function useNearbyPlaces(selectedType: string, isLoaded: boolean) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (err) => setError("Erro ao obter localização: " + err.message)
    );
  }, []);

  useEffect(() => {
    if (!currentPosition || !isLoaded) return;

    const map = new google.maps.Map(document.createElement("div"));
    const service = new google.maps.places.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: currentPosition,
      radius: 10000,
      type: selectedType,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      } else {
        setError("Erro ao buscar locais: " + status);
      }
    });
  }, [currentPosition, selectedType, isLoaded]);

  useEffect(() => {
    if (!selectedPlace || !currentPosition) return;

    const destination = {
      lat: selectedPlace.geometry?.location?.lat() ?? 0,
      lng: selectedPlace.geometry?.location?.lng() ?? 0,
    };

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentPosition,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Erro ao traçar rota:", status);
        }
      }
    );
  }, [selectedPlace, currentPosition]);

  return {
    currentPosition,
    places,
    error,
    directions,
    selectedPlace,
    setSelectedPlace,
    setDirections,
  };
}
