import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const VITE_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;

export default async function deleteSavedTrip(id: string) {
  const res = await axios.delete(`${API_BASE_URL}/savedtrips/${id}`, {
    headers: {
      "x-bypass-token": VITE_APP_API_KEY,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
