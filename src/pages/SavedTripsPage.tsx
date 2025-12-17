import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import useFetchSavedTrips from "../hooks/queries/useFetchSavedTrips";
import deleteSavedTrip from "../api/deleteSavedTrip";
import type { Trip } from "../interfaces/country.interface";
import { Loader, X } from "lucide-react";
import { toast } from "react-toastify";

const SavedTripsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchSavedTrips();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const handleDeleteTrip = async (id: string) => {
    try {
      await deleteSavedTrip(id);
      await queryClient.invalidateQueries({ queryKey: ["savedTrips"] });
      if (selectedTrip?.id === id) setSelectedTrip(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete trip");
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-400 mt-8">
        {" "}
        <Loader />
        Loading...
      </p>
    );

  const trips: Trip[] =
    data?.map((item) => ({
      id: item.id,
      countries: [item.data],
    })) ?? [];

  return (
    <>
      <h1 className="text-indigo-700 col-span-full text-center text-5xl mb-8 mt-8 font-bold bg-clip-text text:transparent">
        Saved Trips
      </h1>
      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {trips.length > 0 ? (
          trips.map((trip) => {
            const country = trip.countries[0];
            return (
              <div
                key={trip.id}
                className="border-2 border-indigo-500 rounded-lg p-4 shadow-2xl cursor-pointer hover:shadow-xl transition-transform hover:scale-105 min-w-[300px]"
                onClick={() => setSelectedTrip(trip)}
              >
                <img
                  src={country.flags?.png || ""}
                  alt={country.name?.common || "Country flag"}
                  className="w-16 h-auto mb-2 rounded"
                />
                <h3 className="font-bold">
                  {country.name?.common || "Unknown"}
                </h3>
                <p>Capital: {country.capital?.[0] || "Unknown"}</p>
                <p>Region: {country.region || "Unknown"}</p>
                <p>
                  Languages:{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "Unknown"}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTrip(trip.id);
                    toast.success(
                      ` ${country.name.common} 💔 Deleted From Saved trips`
                    );
                  }}
                  className="flex gap-2 items-center bg-red-600 hover:bg-red-800 px-4 py-2 rounded text-white cursor-pointer mt-2"
                >
                  Delete <FaTrashAlt size={18} color="white" />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-yellow-800 col-span-full text-center text-2xl">
            No saved trips found.
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
          <div
            className="rounded-lg shadow-xl max-w-2xl w-full p-6 relative text-white border border-green-500"
            style={{
              background: "linear-gradient(90deg, #22d3ee 0%, #f472b6 100%)",
            }}
          >
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-3 right-4 text-white hover:text-gray-200 text-2xl"
            >
              <X className="h-8 w-8  bg-red-600 hover:bg-red-800 rounded text-white cursor-pointer " />
            </button>

            {selectedTrip.countries.map((c) => (
              <div key={c.cca3} className="flex items-center gap-6 mb-4">
                <img
                  src={c.flags?.png}
                  alt={c.name.common}
                  className="w-32 h-auto rounded-md border border-white/40"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{c.name.common}</h2>
                  <p>
                    <strong>cca3:</strong> {c.cca3}
                  </p>
                  <p>
                    <strong>Region:</strong> {c.region}
                  </p>
                  <p>
                    <strong>Capital:</strong> {c.capital?.[0] || "Unknown"}
                  </p>
                  <p>
                    <strong>Languages:</strong>{" "}
                    {c.languages
                      ? Object.values(c.languages).join(", ")
                      : "Unknown"}
                  </p>
                  <p>
                    <strong>Currencies:</strong>{" "}
                    {c.currencies
                      ? Object.values(c.currencies)
                          .map((x) => x.name)
                          .join(", ")
                      : "Unknown"}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  handleDeleteTrip(selectedTrip.id);
                  toast.success(
                    ` ${selectedTrip.countries[0].name.common} 💔 Deleted From Saved trips`
                  );
                }}
                className="flex gap-2 items-center bg-red-600 hover:bg-red-800 px-4 py-2 rounded text-white cursor-pointer"
              >
                Delete Trip <FaTrashAlt size={18} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedTripsPage;
