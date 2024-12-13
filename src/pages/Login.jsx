import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.message === "Login successful") {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="flex justify-center bg-[#475BE8] min-h-screen">
      <div className="flex flex-col px-14 pt-8 bg-white rounded-lg shadow-md w-[400px] h-[400px] mt-40 text-sm">
        <div className="flex gap-x-1 justify-center">
          <div>
            <img src="../assets/Logo.png" className="w-8 h-7" alt="" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#475BE8] ">
              Login
            </h2>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4 mt-10">
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className=" py-3 bg-[#475BE8] text-white rounded hover:bg-blue-700 w-full mt-2 "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
