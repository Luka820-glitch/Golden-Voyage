// client-side-search

// =============================
// import $api from "../http";

// export default async function fetchCountries() {
//   const res = await $api.get("/all", {
//     params: {
//       fields: "name,currencies,languages,capital,region,cca3,flags",
//     },
//   });
//   return res.data;
// }

// ======================================================================================================================================

// server-side-search-by-name:
// =====================================
// import $api from "../http";

// export default async function fetchCountries(searchTerm?: string) {
//   const endpoint = searchTerm
//     ? `/name/${encodeURIComponent(searchTerm)}`
//     : `/all`;

//   const res = await $api.get(endpoint, {
//     params: {
//       fields: "name,currencies,languages,capital,region,cca3,flags",
//     },
//   });

//   return res.data;
// }

// =======================================================================================================================================
// =======================================================================================================================================

// server-side full search
// =====================================

import $api from "../http";
import type { Country } from "../interfaces/country.interface";

export default async function fetchCountries(
  searchTerm?: string
): Promise<Country[]> {
  const params = {
    fields: "name,currencies,languages,capital,region,cca3,flags",
  };

  if (!searchTerm || !searchTerm.trim()) {
    const res = await $api.get("/all", { params });
    return res.data;
  }

  const term = encodeURIComponent(searchTerm.trim());

  const endpoints = [
    `/name/${term}`,
    `/capital/${term}`,
    `/region/${term}`,
    `/lang/${term}`,
    `/currency/${term}`,
  ];

  const seen = new Set<string>();
  const results: Country[] = [];

  const responses = await Promise.allSettled(
    endpoints.map((url) => $api.get(url, { params }))
  );

  responses.forEach((res) => {
    if (res.status === "fulfilled" && Array.isArray(res.value.data)) {
      res.value.data.forEach((country: Country) => {
        if (!seen.has(country.cca3)) {
          seen.add(country.cca3);
          results.push(country);
        }
      });
    }
  });

  return results;
}
