import { useDraggable } from "@dnd-kit/core";
import type {
  Country,
  FavouriteCountry,
} from "../interfaces/country.interface";
import AddToFavButton from "./AddToFavButton";
import { toFavouriteCountry } from "./toFavouriteCountry";

export const DraggableCountryCard: React.FC<{
  country: Country;
  isFavourite: boolean;
  onAddFav: (fav: FavouriteCountry) => void;
  onOpen: (country: Country) => void;
}> = ({ country, isFavourite, onAddFav, onOpen }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: country.cca3,
    data: country,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 50,
        background: "linear-gradient(90deg, #22d3ee 0%, #f472b6 100%)",
      }
    : undefined;

  return (
    <div
      className="border-2 border-indigo-500 rounded-lg p-4 shadow-2xl hover:shadow-xl transition-transform hover:scale-105 cursor-pointer"
      onClick={() => onOpen(country)}
      style={style}
    >
      <div className="flex justify-between">
        <img
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          src={country.flags.png}
          alt={country.name.common}
          className="w-16 h-auto mb-2 cursor-grab active:cursor-grabbing"
        />
        <AddToFavButton
          country={toFavouriteCountry(country)}
          isFavourite={isFavourite}
          onAdded={onAddFav}
        />
      </div>
      <h3 className="font-bold text-2xl">{country.name.common}</h3>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital?.[0]}
      </p>
      <p>
        <strong> Languages:</strong>{" "}
        {country.languages && Object.values(country.languages).join(", ")}
      </p>
    </div>
  );
};
export default DraggableCountryCard;
