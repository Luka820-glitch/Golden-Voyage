import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useFetchSavedTrips from "../hooks/queries/useFetchSavedTrips";

interface NavbarProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: savedTrips } = useFetchSavedTrips();

  const handlePlanTripClick = () => {
    if (location.pathname !== "/all") {
      navigate("/all");
      setTimeout(() => setIsSidebarOpen(true), 300);
    } else {
      setIsSidebarOpen(true);
    }
  };

  const hasSavedTrips = (savedTrips?.length ?? 0) > 0;

  return (
    <nav className="bg-gray-900 w-full fixed top-0 z-50">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink:0 transform transition-transform duration-300 hover:scale-105">
            <Link to="/">
              <img
                className="h-24 w-auto"
                src="/logo.png"
                alt="Logo"
                onClick={() => setIsSidebarOpen(false)}
              />
            </Link>
          </div>

          {/* Menu items */}
          <div className="hidden sm:flex space-x-4">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
            >
              Home
            </Link>
            <Link
              to="/all"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
            >
              Explore Places
            </Link>
            <Link
              to="/favouritecountries"
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
            >
              Favourites
            </Link>
            <button
              onClick={handlePlanTripClick}
              className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium cursor-pointer bg-blue-600"
            >
              🌍🧳 Plan a Trip
            </button>
            {hasSavedTrips && (
              <button
                onClick={() => navigate("/savedtrips")}
                className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium cursor-pointer bg-blue-600"
              >
                🔖 Saved Trips
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
