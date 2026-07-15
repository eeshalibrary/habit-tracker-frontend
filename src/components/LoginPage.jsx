import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim() !== "") {
      onLogin(username);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Habit Tracker
        </h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;