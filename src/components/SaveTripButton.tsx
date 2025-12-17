import type { SavedTripsButtonProps } from "../interfaces/country.interface";

import createSavedTrips from "../api/createSavedTrips";
import { toast } from "react-toastify";

const SavedTripButton: React.FC<SavedTripsButtonProps> = ({
  country,
  isSaved,
  onAdded,
}) => {
  const handleAddToSaved = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isSaved) {
      toast.info(`${country.name.common} is already in your Saved Trips ❤️`);
      return;
    }

    try {
      await createSavedTrips([country]);
      onAdded(country);
      console.log("Added to Saved Trips:", country.name.common);
      toast.success(`${country.name.common} 💖 added to Saved Trips`);
    } catch (err) {
      console.error("Failed to save country:", err);
      toast.error(`${country.name.common} 💔 Failed to add to Saved Trips`);
    }
  };

  return (
    <button
      onClick={handleAddToSaved}
      disabled={isSaved}
      className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors`}
    ></button>
  );
};

export default SavedTripButton;
