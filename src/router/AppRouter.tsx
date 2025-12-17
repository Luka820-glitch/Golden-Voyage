import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CountriesListPage from "../pages/CountriesListPage";
import FavouriteCountriesPage from "../pages/FavouriteCountriesPage";
import SavedTripsPage from "../pages/SavedTripsPage";

interface AppRouterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AppRouter: React.FC<AppRouterProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/all"
        element={
          <CountriesListPage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
      />
      <Route path="/favouritecountries" element={<FavouriteCountriesPage />} />
      <Route path="/savedtrips" element={<SavedTripsPage />} />
    </Routes>
  );
};

export default AppRouter;
