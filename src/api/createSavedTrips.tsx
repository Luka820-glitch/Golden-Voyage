import axios from "axios";
import type { Country } from "../interfaces/country.interface";

const VITE_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default async function createSavedTrips(savedTrips: Country[]) {
  const res = await axios.post(
    `${API_BASE_URL}/savedtrips`,
    { data: savedTrips },
    {
      headers: {
        "Content-Type": "application/json",
        "x-bypass-token": VITE_APP_API_KEY,
      },
    }
  );

  return res.data;
}
