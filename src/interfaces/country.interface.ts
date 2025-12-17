export interface Country {
  name: { common: string };
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  capital?: string[];
  region: string;
  cca3: string;
  flags: { png: string; svg: string };
}

export type ResourceType<C extends Country> =
  C["name"]["common"] extends `${string}Island${string}`
    ? "island"
    : "mainland";

export type CountryResource<C extends Country = Country> = C & {
  type: ResourceType<C>;
};

export type FavouriteCountry = Country & {
  type: "island" | "mainland";
  role: "Europe" | "Asia" | "Africa" | "Americas" | "Antarctic" | "Oceania";
  id?: string;
};

export interface FavouriteCountryResponse {
  id: string;
  resource: string;
  data: FavouriteCountry;
  createdAt: string;
  updatedAt: string;
}

export interface AddToFavButtonProps {
  country: FavouriteCountry;
  isFavourite: boolean;
  onAdded: (country: FavouriteCountry) => void;
}

export interface Trip {
  id: string;
  countries: Country[];
}

export type SavedCountry = Country & {
  id?: string;
  isSaved: true;
};

export interface SavedTripsButtonProps {
  country: Country;
  isSaved: boolean;
  onAdded: (country: Country) => void;
}

export interface SavedTripResponse {
  id: string;
  resource: string;
  data: Country;
  createdAt: string;
  updatedAt: string;
}

export type CountryType = "mainland" | "island";
export type CountryRole =
  | "Europe"
  | "Asia"
  | "Africa"
  | "Americas"
  | "Antarctic"
  | "Oceania";

export type FilterValue = CountryType | CountryRole | "";
