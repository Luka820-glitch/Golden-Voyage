import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";
import Sidebar from "./components/Sidebar";
import type { Country } from "./interfaces/country.interface";
import useFetchSavedTrips from "./hooks/queries/useFetchSavedTrips";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tripCountries, setTripCountries] = useState<Country[]>([]);
  const [draggedCountry, setDraggedCountry] = useState<Country | null>(null);

  const { data: savedTrips } = useFetchSavedTrips();
  const savedCountryIds = new Set(savedTrips?.map((s) => s.data.cca3) ?? []);

  const handleDragStart = (event: DragStartEvent) => {
    const country = event.active.data.current as Country | undefined;
    if (country) setDraggedCountry(country);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setDraggedCountry(null);

    if (over?.id === "trip-dropzone") {
      const country = active.data.current as Country | undefined;
      if (!country) return;

      if (
        tripCountries.some((c) => c.cca3 === country.cca3) ||
        savedCountryIds.has(country.cca3)
      ) {
        toast.error(
          `${country.name.common} is already in your trip or saved trips!`
        );
        return;
      }

      setTripCountries((prev) => [...prev, country]);
    }
  };

  return (
    <>
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          tripCountries={tripCountries}
          setTripCountries={setTripCountries}
          draggedCountry={draggedCountry}
          savedCountryIds={savedCountryIds}
          onDropCountry={(country) =>
            setTripCountries((prev) => [...prev, country])
          }
        />
        <div className="pt-28">
          <AppRouter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </DndContext>
    </>
  );
}

export default App;
