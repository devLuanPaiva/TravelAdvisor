import { IPlace, PlaceType } from "./IPlace.interface";

export interface ISearchFilters {
  type?: PlaceType;
  minRating?: number;
  maxPriceLevel?: number;
  openNow?: boolean;
}
export interface ISearchResult {
  places: IPlace[];
  totalResults: number;
  filtersApplied: ISearchFilters;
}
