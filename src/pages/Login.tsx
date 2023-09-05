import React, { useState, useCallback } from "react";
import { useMutation } from "react-query";
import Auth from "../services/Auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const navigate = useNavigate();

  const mutation = useMutation(
    (data: { name: string; email: string }) =>
      Auth.loginUser(data.name, data.email),
    {
      onSuccess: () => {
        // TODO: Redirect to dashboard
        navigate("/search");
      },
      onError: (error) => {
        console.error("Error logging in:", error);
      },
    }
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setFormData]
  );

  const handleLogin = () => {
    if (!isValidEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);

    mutation.mutate({
      name: formData.name,
      email: formData.email,
    });
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
            className={`w-full px-3 py-2 border rounded-md ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
