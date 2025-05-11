export interface IDestination {
  id: string;
  name: string;
  description: string;
  country: string;
  state?: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
