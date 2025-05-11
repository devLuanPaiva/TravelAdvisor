export type PlaceType = "hotel" | "restaurant" | "attraction" | "tour" | "shop";
export interface IPlace {
  id: string;
  name: string;
  type: PlaceType;
  address: string;
  phone?: string;
  images: string[];
  averageRating: number;
  location: {
    lat: number;
    lng: number;
  };
  priceLevel?: number;
}
