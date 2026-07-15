import React from "react";
import HabitCard from "./HabitCard";

function HabitList({ habits, onLogAdded }) {
  return (
    <div>
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onLogAdded={onLogAdded} />
      ))}
    </div>
  );
}

export default HabitList;