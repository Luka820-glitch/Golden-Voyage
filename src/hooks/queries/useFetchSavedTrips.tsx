import { useQuery } from "@tanstack/react-query";
import type { SavedTripResponse } from "../../interfaces/country.interface";
import fetchSavedTrips from "../../api/fetchSavedTrips";

const useFetchSavedTrips = () => {
  const result = useQuery<SavedTripResponse[]>({
    queryKey: ["savedTrips"],
    queryFn: fetchSavedTrips,
  });
  return result;
};

export default useFetchSavedTrips;
