import axios from "axios";

class Dogs {
  BASE_URL = "https://frontend-take-home-service.fetch.com";

  getBreeds() {
    return axios.get(`${this.BASE_URL}/dogs/breeds`);
  }

  searchDogs(params: any) {
    return axios
      .get(`${this.BASE_URL}/dogs/search`, { params })
      .then((response) => {
        return this.fetchDogs(response.data.resultIds);
      });
  }

  fetchDogs(ids: string[]) {
    return axios.post(`${this.BASE_URL}/dogs`, ids);
  }

  matchDogs(favorites: string[]) {
    return axios.post(`${this.BASE_URL}/dogs/match`, favorites);
  }
}

export default new Dogs();
    