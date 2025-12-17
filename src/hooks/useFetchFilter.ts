import { useCallback, useEffect, useState } from "react";
import type {
  FavouriteCountry,
  FavouriteCountryResponse,
  FilterValue,
} from "../interfaces/country.interface";
import { useSearchParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;
const VITE_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;

const useFetchFilter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FavouriteCountry[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter = (() => {
    const value = searchParams.get("filter");

    const allowedValues: FilterValue[] = [
      "",
      "mainland",
      "island",
      "Europe",
      "Asia",
      "Africa",
      "Americas",
      "Antarctic",
      "Oceania",
    ];
    return allowedValues.includes(value as FilterValue)
      ? (value as FilterValue)
      : "";
  })();

  const [filter, setFilter] = useState<FilterValue>(initialFilter);

  const getParams = useCallback(() => {
    const params: { [key: string]: string } = {};

    if (filter === "mainland" || filter === "island") {
      params.type = filter;
    } else if (filter) {
      params.role = filter;
    }
    return params;
  }, [filter]);

  useEffect(() => {
    const params = getParams();
    setSearchParams(params);
  }, [getParams, setSearchParams]);

  useEffect(() => {
    setIsLoading(true);
    const params = getParams();
    const url =
      Object.keys(params).length > 0
        ? `${baseURL}/favouritecountries?${new URLSearchParams(
            params
          ).toString()}`
        : `${baseURL}/favouritecountries`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-bypass-token": VITE_APP_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const countries = res.map((item: FavouriteCountryResponse) => ({
          ...item.data,
          id: item.id,
        }));
        setData(countries);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [getParams]);

  return { data, filter, setFilter, isLoading };
};

export default useFetchFilter;
