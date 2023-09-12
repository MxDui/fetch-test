import axios from "axios";

class Auth {
  static BASE_URL = "https://frontend-take-home-service.fetch.com";

  async loginUser(name: string, email: string) {
    try {
      const body = {
        name,
        email,
      };

      console.log("body", body);
      const response = await axios.post(`${Auth.BASE_URL}/auth/login`, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
}

export default new Auth();
