import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Define your backend's URL
const API_URL = "http://localhost:8080/api/auth";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send the request to your Node.js backend
      const res = await axios.post(
        `${API_URL}/register`,
        {
          username,
          password,
        },
        {
          // This is CRITICAL for sending/receiving session cookies
          withCredentials: true,
        }
      );

      // Your backend sends status 201 on success
      if (res.status === 201) {
        alert(res.data.message); // "Admin user created successfully!"
        navigate("/"); // go to login page after registration
      }
    } catch (err) {
      // Handle errors from the backend
      if (err.response) {
        // The server responded with a status code (e.g., 400, 500)
        alert(err.response.data.message);
      } else {
        // Network error or server is down
        alert("Server error. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-80 md:w-96">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Register New Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 active:scale-95 transition-transform shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}