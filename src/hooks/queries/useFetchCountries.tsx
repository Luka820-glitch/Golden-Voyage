// client-side-search
// =============================

// import { useQuery } from "@tanstack/react-query";
// import fetchCountries from "../../api/fetchCountries";
// import type { Country } from "../../interfaces/country.interface";

// const useFetchCountries = () => {
//   const result = useQuery<Country[]>({
//     queryKey: ["countries"],
//     queryFn: fetchCountries,
//   });
//   return result;
// };

// export default useFetchCountries;

// ===================================================================================================================
// ===================================================================================================================

// server-side-search:

import { useQuery } from "@tanstack/react-query";
import fetchCountries from "../../api/fetchCountries";
import type { Country } from "../../interfaces/country.interface";

const useFetchCountries = (searchTerm: string) => {
  return useQuery<Country[]>({
    queryKey: ["countries", searchTerm],
    queryFn: () => fetchCountries(searchTerm),
    enabled: true,
  });
};

export default useFetchCountries;
