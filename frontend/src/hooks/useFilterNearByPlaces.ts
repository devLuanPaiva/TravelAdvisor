import { IPlace, ISearchFilters } from "@core";

interface FilterOptions {
  userLocation: { lat: number; lng: number };
  places: IPlace[];
  filters?: ISearchFilters;
  maxDistanceKm?: number;
}

function getDistanceInKm(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function filterNearbyPlaces({
  userLocation,
  places,
  filters,
  maxDistanceKm = 10,
}: FilterOptions): IPlace[] {
  return places
    .filter((place) => {
      const distance = getDistanceInKm(userLocation, place.location);
      const meetsDistance = distance <= maxDistanceKm;

      const meetsType = !filters?.type || place.type === filters.type;
      const meetsRating =
        filters?.minRating === undefined ||
        place.averageRating >= filters.minRating;
      const meetsPrice =
        filters?.maxPriceLevel === undefined ||
        (place.priceLevel !== undefined &&
          place.priceLevel <= filters.maxPriceLevel);

      return meetsDistance && meetsType && meetsRating && meetsPrice;
    })
    .sort(
      (a, b) =>
        getDistanceInKm(userLocation, a.location) -
        getDistanceInKm(userLocation, b.location)
    );
}
