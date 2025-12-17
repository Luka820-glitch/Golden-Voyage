import $apiRes from "../services/apiRes";

const VITE_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;

export default async function fetchFavCountries() {
  const res = await $apiRes.get("/favouritecountries", {
    headers: {
      "Content-Type": "application/json",
      "x-bypass-token": VITE_APP_API_KEY,
    },
  });
  return res.data;
}
