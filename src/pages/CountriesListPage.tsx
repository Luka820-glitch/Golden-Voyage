// client-side-search code
// =======================================

// import React from "react";
// import useFetchCountries from "../hooks/queries/useFetchCountries";
// import type {
//   Country,
//   FavouriteCountry,
// } from "../interfaces/country.interface";
// import AddToFavButton from "../components/AddToFavButton";
// import fetchFavCountries from "../api/fetchFavCountries";
// import DraggableCountryCard from "../components/DraggableCountryCard";
// import { toFavouriteCountry } from "../components/toFavouriteCountry";
// import { Loader, X } from "lucide-react";
// import fetchCountry from "../api/fetchCountry";

// interface CountriesListPageProps {
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
// }

// interface FavApiResponse {
//   data: FavouriteCountry;
// }

// const CountriesListPage: React.FC<CountriesListPageProps> = ({
//   searchTerm: initialSearchTerm,
// }) => {
//   const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);

//   const { data: countries, error, isLoading } = useFetchCountries();

//   const [filteredCountries, setFilteredCountries] = React.useState<Country[]>(
//     []
//   );
//   const [favCountries, setFavCountries] = React.useState<FavouriteCountry[]>(
//     []
//   );

//   React.useEffect(() => {
//     async function loadFavs() {
//       try {
//         const res: FavApiResponse[] = await fetchFavCountries();
//         setFavCountries(res.map((item) => item.data));
//       } catch (err) {
//         console.error("Failed to load favourites:", err);
//       }
//     }
//     loadFavs();
//   }, []);

//   const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
//     null
//   );

//   React.useEffect(() => {
//     if (selectedCountry) {
//       fetchCountry(selectedCountry.cca3);
//     }
//   }, [selectedCountry]);

//   const isFavourite = (cca3: string) =>
//     favCountries.some((c) => c.cca3 === cca3);

//   React.useEffect(() => {
//     if (!countries) return;
//     const lowerSearch = searchTerm.trim().toLowerCase();

//     if (!lowerSearch) {
//       setFilteredCountries(countries);
//       return;
//     }

//     const combined: Country[] = [
//       ...countries,
//       ...favCountries.filter(
//         (fav) => !countries.some((c) => c.cca3 === fav.cca3)
//       ),
//     ];

//     const filtered = combined.filter((country: Country) => {
//       const nameMatch = country.name.common.toLowerCase().includes(lowerSearch);
//       const capitalMatch = country.capital?.some((c) =>
//         c.toLowerCase().includes(lowerSearch)
//       );
//       const regionMatch = country.region.toLowerCase().includes(lowerSearch);
//       const languagesMatch =
//         country.languages &&
//         Object.values(country.languages).some((lang) =>
//           lang.toLowerCase().includes(lowerSearch)
//         );
//       const currenciesMatch =
//         country.currencies &&
//         Object.values(country.currencies).some((cur) =>
//           cur.name.toLowerCase().includes(lowerSearch)
//         );

//       const favouriteMatch =
//         lowerSearch.includes("fav") && isFavourite(country.cca3);

//       return (
//         nameMatch ||
//         capitalMatch ||
//         regionMatch ||
//         languagesMatch ||
//         currenciesMatch ||
//         favouriteMatch
//       );
//     });

//     setFilteredCountries(filtered);
//   }, [searchTerm, countries, favCountries]);

//   if (error) return <h3>{error.message}</h3>;
//   if (isLoading)
//     return (
//       <h3>
//         <Loader />
//         Loading...
//       </h3>
//     );

//   return (
//     <>
//       <h1 className="text-indigo-700 col-span-full text-center text-5xl mb-8 mt-8 font-bold bg-clip-text text:transparent">
//         Explore Places{" "}
//       </h1>
//       <div className="mt-4 px-4">
//         <div className="flex-1 mx-4 hidden sm:flex ">
//           <input
//             type="text"
//             placeholder="Search countries..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-pink-300 rounded-md px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
//           {filteredCountries.map((country) => (
//             <DraggableCountryCard
//               key={country.cca3}
//               country={country}
//               isFavourite={isFavourite(country.cca3)}
//               onAddFav={(newFav) =>
//                 setFavCountries((prev) => [...prev, newFav])
//               }
//               onOpen={setSelectedCountry}
//             />
//           ))}
//         </div>
//       </div>

//       {selectedCountry && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
//           <div
//             className="rounded-lg shadow-xl max-w-2xl w-full p-6 relative text-white border border-indigo-500"
//             style={{
//               background: "linear-gradient(90deg, #22d3ee 0%, #f472b6 100%)",
//             }}
//           >
//             <button
//               onClick={() => setSelectedCountry(null)}
//               className="absolute top-3 right-4 text-white hover:text-gray-200 text-2xl"
//             >
//               <X className="h-8 w-8  bg-red-600 hover:bg-red-800 rounded text-white cursor-pointer " />
//             </button>

//             <div className="flex items-center gap-6 mb-4">
//               <img
//                 src={selectedCountry.flags.png}
//                 alt={selectedCountry.name.common}
//                 className="w-32 h-auto rounded-md border border-white/40"
//               />
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">
//                   {selectedCountry.name.common}
//                 </h2>
//                 <p>
//                   <strong>cca3:</strong> {selectedCountry.cca3}
//                 </p>
//                 <p>
//                   <strong>Region:</strong> {selectedCountry.region}
//                 </p>
//                 <p>
//                   <strong>Capital:</strong>{" "}
//                   {selectedCountry.capital?.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Languages:</strong>{" "}
//                   {selectedCountry.languages &&
//                     Object.values(selectedCountry.languages).join(", ")}
//                 </p>
//                 <p>
//                   <strong>Currencies:</strong>{" "}
//                   {selectedCountry.currencies &&
//                     Object.values(selectedCountry.currencies)
//                       .map((c) => c.name)
//                       .join(", ")}
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-end mt-4">
//               <AddToFavButton
//                 country={toFavouriteCountry(selectedCountry)}
//                 isFavourite={favCountries.some(
//                   (f) => f.cca3 === selectedCountry.cca3
//                 )}
//                 onAdded={(newFav) =>
//                   setFavCountries((prev) => [...prev, newFav])
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CountriesListPage;

// =============================================================================================================================
// =============================================================================================================================

// server-side-search code
// ==================================
import React from "react";
import useFetchCountries from "../hooks/queries/useFetchCountries";
import type {
  Country,
  FavouriteCountry,
} from "../interfaces/country.interface";
import AddToFavButton from "../components/AddToFavButton";
import fetchFavCountries from "../api/fetchFavCountries";
import DraggableCountryCard from "../components/DraggableCountryCard";
import { toFavouriteCountry } from "../components/toFavouriteCountry";
import { Loader, X } from "lucide-react";
import useDebounce from "../hooks/useDebounce";
import fetchCountry from "../api/fetchCountry";

interface CountriesListPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface FavApiResponse {
  data: FavouriteCountry;
}

const CountriesListPage: React.FC<CountriesListPageProps> = ({
  searchTerm: initialSearchTerm,
}) => {
  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    data: countries,
    error,
    isLoading,
  } = useFetchCountries(debouncedSearch);

  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>(
    []
  );
  const [favCountries, setFavCountries] = React.useState<FavouriteCountry[]>(
    []
  );

  React.useEffect(() => {
    async function loadFavs() {
      try {
        const res: FavApiResponse[] = await fetchFavCountries();
        setFavCountries(res.map((item) => item.data));
      } catch (err) {
        console.error("Failed to load favourites:", err);
      }
    }
    loadFavs();
  }, []);

  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );

  React.useEffect(() => {
    if (selectedCountry) {
      fetchCountry(selectedCountry.cca3);
    }
  }, [selectedCountry]);

  const isFavourite = (cca3: string) =>
    favCountries.some((c) => c.cca3 === cca3);

  React.useEffect(() => {
    if (!countries) return;
    const lowerSearch = searchTerm.trim().toLowerCase();

    if (!lowerSearch) {
      setFilteredCountries(countries);
      return;
    }

    const combined: Country[] = [
      ...countries,
      ...favCountries.filter(
        (fav) => !countries.some((c) => c.cca3 === fav.cca3)
      ),
    ];

    const filtered = combined.filter((country: Country) => {
      const nameMatch = country.name.common.toLowerCase().includes(lowerSearch);
      const capitalMatch = country.capital?.some((c) =>
        c.toLowerCase().includes(lowerSearch)
      );
      const regionMatch = country.region.toLowerCase().includes(lowerSearch);
      const languagesMatch =
        country.languages &&
        Object.values(country.languages).some((lang) =>
          lang.toLowerCase().includes(lowerSearch)
        );
      const currenciesMatch =
        country.currencies &&
        Object.values(country.currencies).some((cur) =>
          cur.name.toLowerCase().includes(lowerSearch)
        );

      const favouriteMatch =
        lowerSearch.includes("fav") && isFavourite(country.cca3);

      return (
        nameMatch ||
        capitalMatch ||
        regionMatch ||
        languagesMatch ||
        currenciesMatch ||
        favouriteMatch
      );
    });

    setFilteredCountries(filtered);
  }, [searchTerm, countries, favCountries]);

  if (error) return <h3>{error.message}</h3>;
  if (isLoading)
    return (
      <h3>
        <Loader />
        Loading...
      </h3>
    );

  return (
    <>
      <h1 className="text-indigo-700 col-span-full text-center text-5xl mb-8 mt-8 font-bold bg-clip-text text:transparent">
        Explore Places{" "}
      </h1>
      <div className="mt-4 px-4">
        <div className="flex-1 mx-4 hidden sm:flex ">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-pink-300 rounded-md px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          {filteredCountries.map((country) => (
            <DraggableCountryCard
              key={country.cca3}
              country={country}
              isFavourite={isFavourite(country.cca3)}
              onAddFav={(newFav) =>
                setFavCountries((prev) => [...prev, newFav])
              }
              onOpen={setSelectedCountry}
            />
          ))}
        </div>
      </div>

      {selectedCountry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
          <div
            className="rounded-lg shadow-xl max-w-2xl w-full p-6 relative text-white border border-indigo-500"
            style={{
              background: "linear-gradient(90deg, #22d3ee 0%, #f472b6 100%)",
            }}
          >
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-3 right-4 text-white hover:text-gray-200 text-2xl"
            >
              <X className="h-8 w-8  bg-red-600 hover:bg-red-800 rounded text-white cursor-pointer " />
            </button>

            <div className="flex items-center gap-6 mb-4">
              <img
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
                className="w-32 h-auto rounded-md border border-white/40"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedCountry.name.common}
                </h2>
                <p>
                  <strong>cca3:</strong> {selectedCountry.cca3}
                </p>
                <p>
                  <strong>Region:</strong> {selectedCountry.region}
                </p>
                <p>
                  <strong>Capital:</strong>{" "}
                  {selectedCountry.capital?.join(", ")}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {selectedCountry.languages &&
                    Object.values(selectedCountry.languages).join(", ")}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {selectedCountry.currencies &&
                    Object.values(selectedCountry.currencies)
                      .map((c) => c.name)
                      .join(", ")}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <AddToFavButton
                country={toFavouriteCountry(selectedCountry)}
                isFavourite={favCountries.some(
                  (f) => f.cca3 === selectedCountry.cca3
                )}
                onAdded={(newFav) =>
                  setFavCountries((prev) => [...prev, newFav])
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountriesListPage;
