import { X } from "lucide-react";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import type { Country } from "../interfaces/country.interface";
import createSavedTrips from "../api/createSavedTrips";
import useFetchSavedTrips from "../hooks/queries/useFetchSavedTrips";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tripCountries: Country[];
  setTripCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  draggedCountry?: Country | null;
  savedCountryIds: Set<string>;
  onDropCountry: (country: Country) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  tripCountries,
  setTripCountries,
  draggedCountry,
  savedCountryIds,
}) => {
  const navigate = useNavigate();
  const { data: savedTrips, refetch } = useFetchSavedTrips();

  const { setNodeRef, isOver } = useDroppable({ id: "trip-dropzone" });

  const isInvalidDrop = Boolean(
    draggedCountry &&
      (tripCountries.some((c) => c.cca3 === draggedCountry.cca3) ||
        savedCountryIds.has(draggedCountry.cca3))
  );

  const handleSaveTrip = async () => {
    if (tripCountries.length === 0) return;

    const newCountries = tripCountries.filter(
      (country) => !savedCountryIds.has(country.cca3)
    );

    if (newCountries.length === 0) {
      toast.info("All selected countries are already saved!");
      return;
    }

    try {
      await createSavedTrips(newCountries);
      await refetch();
      setTripCountries([]);

      const message =
        newCountries.length > 1
          ? "Trips saved successfully! ✈️"
          : "Trip saved successfully! ✈️";
      toast.success(message);
    } catch (err) {
      console.error("Failed to save trip:", err);

      toast.error("Failed to save trip. Please try again.");
    }
  };

  const hasSavedTrips = (savedTrips?.length ?? 0) > 0;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">Plan Your Trip</h2>
        <div className="flex gap-2 items-center">
          {hasSavedTrips && (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/savedtrips");
              }}
              className="px-2 py-2 rounded bg-blue-700 hover:bg-gray-600 transition cursor-pointer"
            >
              💾 Saved Trips
            </button>
          )}
          <button onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5 text-red-400 hover:text-red-600 cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-300 mb-2">
          Drag countries here to plan your trip:
        </p>
        <div
          ref={setNodeRef}
          className={`border-2 border-dashed rounded-md p-4 min-h-[150px] transition-colors ${
            isInvalidDrop
              ? "border-red-500 bg-red-900/20"
              : isOver
              ? "border-green-400 bg-green-900/30"
              : "border-gray-600 bg-gray-700/30"
          }`}
        >
          {tripCountries.length === 0 ? (
            <p className="text-gray-400 text-center">Drop countries here 🗺️</p>
          ) : (
            tripCountries.map((c) => (
              <div
                key={c.cca3}
                className="p-2 bg-gray-700 rounded-md mb-2 flex items-center justify-between"
              >
                <span>{c.name.common}</span>
                <button
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  onClick={() =>
                    setTripCountries((prev) =>
                      prev.filter((x) => x.cca3 !== c.cca3)
                    )
                  }
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleSaveTrip}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-md cursor-pointer"
        >
          Save Trip
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
