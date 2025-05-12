import { useState, useEffect } from "react";

export interface Restaurant {
  id: string;
  name: string;
  distance: string;
  rating?: number;
  price?: string;
  cuisine?: { name: string }[];
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

interface Location {
  latitude: number;
  longitude: number;
  error?: string;
}

const useNearbyRestaurants = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocation({
          latitude: -6.11096526634353, 
          longitude: -38.20649143408377,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  const fetchNearbyRestaurants = async (lat: number, lng: number) => {
    const url =
      "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng";

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${url}?latitude=${lat}&longitude=${lng}&limit=30&distance=100&open_now=false&lunit=km&lang=en_US`,
        options
      );
      const result = await response.json();

      interface ApiRestaurant {
        location_id: string;
        name: string;
        distance: string;
        rating?: number;
        price?: string;
        cuisine?: { name: string }[];
        address: string;
        latitude: number;
        longitude: number;
      }

      if (result.data && Array.isArray(result.data)) {
        const formattedRestaurants = result.data.map((item: ApiRestaurant) => ({
          id: item.location_id,
          name: item.name,
          distance: item.distance,
          rating: item.rating,
          price: item.price,
          cuisine: item.cuisine,
          location: {
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
          },
        }));
        setRestaurants(formattedRestaurants);
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch restaurants");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location && !error) {
      fetchNearbyRestaurants(location.latitude, location.longitude);
    }
  }, [location, error]);

  return {
    location,
    restaurants,
    loading,
    error,
    getCurrentLocation,
    fetchNearbyRestaurants,
  };
};

export default useNearbyRestaurants;
