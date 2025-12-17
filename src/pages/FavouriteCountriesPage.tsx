import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import type {
  FavouriteCountry,
  FilterValue,
} from "../interfaces/country.interface";
import useFetchFilter from "../hooks/useFetchFilter";
import deleteFavCountry from "../api/deleteFavCountry";
import { Loader, X } from "lucide-react";
import { toast } from "react-toastify";

const FavouriteCountriesPage: React.FC = () => {
  const [favCountries, setFavCountries] = useState<FavouriteCountry[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<FavouriteCountry | null>(null);

  const { data, filter, setFilter, isLoading } = useFetchFilter();

  useEffect(() => {
    setFavCountries(data);
  }, [data]);

  async function handleRemove(id: string) {
    try {
      await deleteFavCountry(id);
      setFavCountries((prev) => prev.filter((c) => c.id !== id));
      if (selectedCountry?.id === id) setSelectedCountry(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove favourite country");
    }
  }

  if (isLoading)
    return (
      <p className="text-center text-gray-400 mt-8">
        <Loader />
        Loading...
      </p>
    );
  return (
    <>
      <h1 className="text-indigo-700 col-span-full text-center text-5xl mb-8 mt-8 font-bold bg-clip-text text:transparent">
        Favourite Countries
      </h1>
      <div className="flex-1 mx-4 hidden sm:flex mt">
        <select
          value={filter}
          onChange={(e) => {
            const value = e.target.value as FilterValue;
            setFilter(value);
          }}
          className="w-full border border-pink-300 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All types and Regions</option>
          <option value="mainland">mainland</option>
          <option value="island">island</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Antarctic">Antarctic</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {favCountries.length > 0 ? (
          favCountries.map((country) => (
            <div
              key={country.id}
              className="border-2 border-indigo-500 rounded-lg p-4 shadow-2xl cursor-pointer min-w-[300px] hover:shadow-xl transition-transform hover:scale-105"
              onClick={() => setSelectedCountry(country)}
            >
              <img
                src={country.flags?.png || ""}
                alt={country.name?.common || "Country flag"}
                className="w-16 h-auto mb-2"
              />
              <h3 className="font-bold text-2xl">
                {country.name?.common || "Unknown"}
              </h3>
              <p>
                <strong>Capital:</strong> {country.capital?.[0] || "Unknown"}
              </p>
              <p>
                <strong>Region:</strong> {country.region || "Unknown"}
              </p>
              <p>
                <strong> Type: </strong> {country.type || "Unknown"}
              </p>
              <div className="mt-auto flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(country.id!);
                    toast.success(
                      ` ${country.name.common} 💔 Deleted From Favourites`
                    );
                  }}
                  className="flex gap-2 items-center bg-red-600 hover:bg-red-800 px-4 py-2 rounded text-white cursor-pointer"
                >
                  Delete <FaTrashAlt size={20} color="white" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-yellow-800 col-span-full text-2xl">
            No favourite countries found.
          </p>
        )}
      </div>
      {/* Modal */}
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
              className="absolute top-3 right-4"
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
                  {selectedCountry.capital?.[0] || "Unknown"}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {selectedCountry.languages
                    ? Object.values(selectedCountry.languages).join(", ")
                    : "Unknown"}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {selectedCountry.currencies
                    ? Object.values(selectedCountry.currencies)
                        .map((c) => c.name)
                        .join(", ")
                    : "Unknown"}
                </p>
                <p>
                  <strong> Type: </strong> {selectedCountry.type || "Unknown"}
                </p>
                <p>
                  <strong> Search "Role": </strong>{" "}
                  {selectedCountry.role || "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  selectedCountry.id && handleRemove(selectedCountry.id);
                  toast.success(
                    ` ${selectedCountry.name.common} 💔 Deleted From Favourites`
                  );
                }}
                className="flex gap-2 items-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
              >
                Delete <FaTrashAlt size={20} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default FavouriteCountriesPage;
