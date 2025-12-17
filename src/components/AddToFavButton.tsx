import { FaHeart } from "react-icons/fa";
import type { AddToFavButtonProps } from "../interfaces/country.interface";
import createFavCountries from "../api/createFavCountries";
import { toast } from "react-toastify";

const AddToFavButton: React.FC<AddToFavButtonProps> = ({
  country,
  isFavourite,
  onAdded,
}) => {
  const handleAddToFav = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isFavourite) {
      toast.info(`${country.name.common} is already in your favourites ❤️`);
      return;
    }

    try {
      await createFavCountries([country]);
      onAdded(country);
      console.log("Added to favourites:", country.name.common);
      toast.success(`${country.name.common} 💖 added to favourites`);
    } catch (err) {
      console.error("Failed to add favourite country:", err);
      toast.error(
        `${country.name.common} 💔 Failed to add to favourite countries`
      );
    }
  };

  return (
    <button
      onClick={handleAddToFav}
      disabled={isFavourite}
      className={`flex items-center gap-2 px-3 py-3 rounded-md transition-colors ${
        isFavourite
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-700 hover:bg-indigo-600 text-white cursor-pointer"
      }`}
    >
      {isFavourite ? "Added" : "Add to fav"}{" "}
      <FaHeart className={isFavourite ? "text-gray-300" : "text-pink-500"} />
    </button>
  );
};

export default AddToFavButton;
