import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dog } from "../types";
import Dogs from "../services/Dogs";
import { useQuery, useMutation } from "react-query";
import DogCard from "../components/DogCard";

const Search: React.FC = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [favorites, setFavorites] = useState<string[]>([]);

  const {
    data: breedsData,
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
  } = useQuery("breeds", Dogs.getBreeds);

  const searchDogsMutation = useMutation(Dogs.searchDogs);
  const fetchDogsMutation = useMutation(Dogs.fetchDogs);
  const dogs: Dog[] = fetchDogsMutation.data || [];
  const availableBreeds = breedsData || [];
  const matchDogsMutation = useMutation(Dogs.matchDogs);

  const handleSearch = () => {
    const params = {
      breeds: selectedBreeds,
      sort: `breed:${sortOrder}`,
      size: 25,
    };

    searchDogsMutation.mutate(params, {
      onSuccess: (response) => {
        fetchDogsMutation.mutate(response as string[]);
      },
    });
  };

  const toggleFavorite = (dogId: string) => {
    const newFavorites = [...favorites];
    if (favorites.includes(dogId)) {
      const index = newFavorites.indexOf(dogId);
      newFavorites.splice(index, 1);
    } else {
      newFavorites.push(dogId);
    }
    setFavorites(newFavorites);
  };

  const generateMatch = () => {
    matchDogsMutation.mutate(favorites, {
      onSuccess: (response) => {
        alert(`Your match is dog with ID: ${response.match}`);
      },
    });
  };

  if (isLoadingBreeds) return <p>Loading...</p>;
  if (isErrorBreeds) return <p>Error fetching breeds.</p>;

  return (
    <motion.div
      className="p-4 h-screen bg-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Search Dogs</h1>
      <div className="flex justify-center items-center space-x-4 mb-6">
        <select
          className="p-2 border rounded-md shadow-md"
          onChange={(e) => setSelectedBreeds([e.target.value])}
        >
          {availableBreeds &&
            availableBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
        </select>
        <select
          className="p-2 border rounded-md shadow-md"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              isFavorite={favorites.includes(dog.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="p-4 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 transition duration-300"
          onClick={generateMatch}
        >
          Generate Match
        </button>
      </div>
    </motion.div>
  );
};

export default Search;
