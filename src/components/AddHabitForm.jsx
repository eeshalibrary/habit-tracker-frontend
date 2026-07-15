import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://habit-tracker-backend-512u.onrender.com";

function AddHabitForm({ username, onHabitAdded }) {
  const [name, setName] = useState("");
  const [trackingType, setTrackingType] = useState("BOOLEAN");
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") return;

    const payload = {
      name,
      trackingType,
      low: trackingType === "NUMERICAL" ? parseInt(low) : null,
      high: trackingType === "NUMERICAL" ? parseInt(high) : null,
      user: { username },
    };

    axios
      .post(`${API_BASE}/user/habit/`, payload)
      .then(() => onHabitAdded())
      .catch((err) => console.error("Failed to add habit", err));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Add New Habit</h2>

      <input
        type="text"
        placeholder="Habit name (e.g. Gym, Sleep)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={trackingType}
        onChange={(e) => setTrackingType(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="BOOLEAN">Yes / No</option>
        <option value="NUMERICAL">Numerical</option>
      </select>

      {trackingType === "NUMERICAL" && (
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            placeholder="Low"
            value={low}
            onChange={(e) => setLow(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="High"
            value={high}
            onChange={(e) => setHigh(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Add Habit
      </button>
    </div>
  );
}

export default AddHabitForm;