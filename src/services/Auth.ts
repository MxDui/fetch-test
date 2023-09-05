import axios from "axios";

class Auth {
  loginUser = ({ name, email }: { name: string; email: string }) => {
    return axios.post(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        name,
        email,
      },
      {
        withCredentials: true,
      }
    );
  };
}

export default new Auth();
