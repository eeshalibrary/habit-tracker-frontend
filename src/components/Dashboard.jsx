import React, { useState, useEffect } from "react";
import axios from "axios";
import HabitList from "./HabitList";
import AddHabitForm from "./AddHabitForm";

const API_BASE = "https://habit-tracker-backend-512u.onrender.com";

function Dashboard({ username }) {
  const [habits, setHabits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchHabits = () => {
    axios
      .get(`${API_BASE}/user/habit/${username}`)
      .then((res) => {
        console.log("habits response:", res.data);
        const data = Array.isArray(res.data) ? res.data : [];
        setHabits(data);
      })
      .catch((err) => console.error("Failed to fetch habits", err));
};

  useEffect(() => {
    fetchHabits();
  }, [username]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Hey, {username}! 👋
        </h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {showAddForm ? "Cancel" : "+ Add Habit"}
        </button>
      </div>

      {showAddForm && (
        <AddHabitForm
          username={username}
          onHabitAdded={() => {
            fetchHabits();
            setShowAddForm(false);
          }}
        />
      )}

      <HabitList habits={habits} onLogAdded={fetchHabits} />
    </div>
  );
}

export default Dashboard;