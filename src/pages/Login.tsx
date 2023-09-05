import React, { useState, useCallback } from "react";
import { useMutation } from "react-query";
import Auth from "../services/Auth";

function Login() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const mutation = useMutation(Auth.loginUser, {
    onSuccess: () => {
        // TODO: Redirect to dashboard
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setFormData]
  );

  const handleLogin = () => {
    mutation.mutate(formData);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-lightBlue-200 to-purple-400">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Welcome to Fetch
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-300"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
