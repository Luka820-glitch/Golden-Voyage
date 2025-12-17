import type {
  Country,
  FavouriteCountry,
} from "../interfaces/country.interface";

export function toFavouriteCountry(country: Country): FavouriteCountry {
  let role: FavouriteCountry["role"];

  switch (country.region) {
    case "Europe":
      role = "Europe";
      break;
    case "Asia":
      role = "Asia";
      break;
    case "Africa":
      role = "Africa";
      break;
    case "Americas":
      role = "Americas";
      break;
    case "Oceania":
      role = "Oceania";
      break;
    case "Antarctic":
    case "Antarctica":
      role = "Antarctic";
      break;
    default:
      role = "Europe";
  }

  return {
    ...country,
    type: country.name.common.includes("Island") ? "island" : "mainland",
    role,
  };
}
