import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const API_BASE = "https://habit-tracker-backend-512u.onrender.com";

function HabitCard({ habit, onLogAdded }) {
  const [logs, setLogs] = useState([]);
  const [value, setValue] = useState("");

  const fetchLogs = () => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      .toISOString()
      .split("T")[0];

    axios
      .get(`${API_BASE}/user/habit/logs/${habit.id}`, {
        params: { startDate: start, endDate: end },
      })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setLogs(data);
      })
      .catch((err) => console.error("Failed to fetch logs", err));
  };

  useEffect(() => {
    fetchLogs();
  }, [habit.id]);

  const handleLog = () => {
    if (value.trim() === "") return;

    axios
      .post(`${API_BASE}/user/habit/logs`, {
        habitId: habit.id,
        value,
        date: new Date().toISOString().split("T")[0],
      })
      .then(() => {
        setValue("");
        fetchLogs();
        onLogAdded();
      })
      .catch((err) => console.error("Failed to log value", err));
  };

  const heatmapData = logs.map((log) => ({
    date: log.logDate,
    count: log.value === "true" ? 1 : parseInt(log.value) || 1,
  }));

  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const endDate = new Date();

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{habit.name}</h2>
        <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {habit.trackingType}
        </span>
      </div>

      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return value.count > 0 ? "color-scale-4" : "color-empty";
        }}
      />

      <div className="mt-4 flex gap-2">
        {habit.trackingType === "BOOLEAN" ? (
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        ) : (
          <input
            type="number"
            placeholder={`Enter value (${habit.low} - ${habit.high})`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <button
          onClick={handleLog}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Log
        </button>
      </div>
    </div>
  );
}

export default HabitCard;