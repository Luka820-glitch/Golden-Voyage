import $api from "../http";

export default async function fetchCountry(code: string) {
  const res = await $api.get(`/alpha/${code}`, {
    params: {
      fields: "name,capital,region,languages,currencies,flags,cca3",
    },
  });
  return res.data;
}
