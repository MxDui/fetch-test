import React from "react";
import { Dog } from "../types";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (dogId: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({
  dog,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full h-64 object-cover" src={dog.img} alt={dog.name} />
      <div className="px-6 py-4 bg-white bg-opacity-75">
        <div className="font-bold text-xl mb-2">{dog.name}</div>
        <p>Age: {dog.age}</p>
        <p>Zip Code: {dog.zip_code}</p>
        <p>Breed: {dog.breed}</p>
        <button
          className={`mt-2 p-2 w-full block text-center ${
            isFavorite ? "bg-red-500" : "bg-green-500"
          } text-white rounded-md hover:opacity-80 transition duration-300`}
          onClick={() => onToggleFavorite(dog.id)}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default DogCard;
