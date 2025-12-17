import { useQuery } from "@tanstack/react-query";
import type { Country } from "../../interfaces/country.interface";
import fetchCountry from "../../api/fetchCountry";

export default function useFetchCountry(code: string | null) {
  return useQuery<Country>({
    queryKey: ["country", code],
    queryFn: () => fetchCountry(code as string),
    enabled: !!code,
  });
}
