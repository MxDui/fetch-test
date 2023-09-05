import axios from "axios";
import { SearchDogsParams, Dog, Match } from "../types";

class Dogs {
  static BASE_URL = "https://frontend-take-home-service.fetch.com";

  // Assuming the API returns a list of strings representing breeds
  getBreeds(): Promise<string[]> {
    return axios
      .get<string[]>(`${Dogs.BASE_URL}/dogs/breeds`)
      .then((res) => res.data);
  }

  // Assuming the API returns an object with a key 'resultIds' containing a list of dog IDs
  searchDogs(params: SearchDogsParams): Promise<string[] | Dog[]> {
    return axios
      .get<{ resultIds: string[] }>(`${Dogs.BASE_URL}/dogs/search`, { params })
      .then((response) => {
        return this.fetchDogs(response.data.resultIds);
      });
  }

  // Assuming the API returns a list of Dog objects
  fetchDogs(ids: string[]): Promise<Dog[]> {
    return axios
      .post<Dog[]>(`${Dogs.BASE_URL}/dogs`, ids)
      .then((res) => res.data);
  }

  // Assuming the API returns an object of type Match
  matchDogs(favorites: string[]): Promise<Match> {
    return axios
      .post<Match>(`${Dogs.BASE_URL}/dogs/match`, favorites)
      .then((res) => res.data);
  }
}

export default new Dogs();
