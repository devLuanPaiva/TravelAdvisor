"use client";
import { useEffect, useState } from "react";
import { IPlace, PlaceType } from "@core";

interface UseNearbyPlacesProps {
  city: string;
}

interface RapidApiAutoCompleteItem {
  detailsV2: {
    locationId: string;
    names: { name: string };
    geocode: { latitude: number; longitude: number };
    reviewRating?: { rating?: number };
    placeType?: string;
    priceLevel?: string;
  };
}

export function useNearbyPlaces({ city }: UseNearbyPlacesProps) {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const url = `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${encodeURIComponent(
          city
        )}&lang=pt-BR&units=km`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          },
        });

        const result = await response.json();

        const extracted: IPlace[] =
          (result?.data?.Typeahead_autocomplete?.results as RapidApiAutoCompleteItem[])
            ?.filter((r) => r.detailsV2?.names?.name)
            .map((r) => ({
              id: r.detailsV2.locationId,
              name: r.detailsV2.names.name,
              location: {
                lat: r.detailsV2.geocode.latitude,
                lng: r.detailsV2.geocode.longitude,
              },
              averageRating: r.detailsV2.reviewRating?.rating ?? 0,
              type: (r.detailsV2.placeType as PlaceType) ?? "attraction",
              priceLevel: parseInt(r.detailsV2?.priceLevel ?? "0") || undefined,
              address: "Endereço não disponível",
              phone: undefined,
              images: [],
            })) ?? [];


        setPlaces(extracted);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao buscar locais.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchPlaces();
  }, [city]);

  return { places, loading, error };
}
