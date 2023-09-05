import React, { useState, useEffect } from "react";
import { Dog } from "../types";
import Dogs from "../services/Dogs";

const Search: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    Dogs.getBreeds().then((response) => {
      setAvailableBreeds(response.data);
    });
  }, []);

  const handleSearch = () => {
    const params = {
      breeds: selectedBreeds,
      sort: `breed:${sortOrder}`,
      size: 25,
    };

    Dogs.searchDogs(params)
      .then((response) => {
        return Dogs.fetchDogs(response.data.resultIds);
      })
      .then((response) => {
        setDogs(response.data);
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
    Dogs.matchDogs(favorites).then((response) => {
      alert(`Your match is dog with ID: ${response.data.match}`);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Dogs</h1>
      <div>
        <select onChange={(e) => setSelectedBreeds([e.target.value])}>
          {availableBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {dogs.map((dog) => (
          <div key={dog.id}>
            <img src={dog.img} alt={dog.name} width="100" />
            <p>Name: {dog.name}</p>
            <p>Age: {dog.age}</p>
            <p>Zip Code: {dog.zip_code}</p>
            <p>Breed: {dog.breed}</p>
            <button onClick={() => toggleFavorite(dog.id)}>
              {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
            </button>
          </div>
        ))}
      </div>
      <button onClick={generateMatch}>Generate Match</button>
    </div>
  );
};

export default Search;
