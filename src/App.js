import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {username ? (
        <Dashboard username={username} />
      ) : (
        <LoginPage onLogin={setUsername} />
      )}
    </div>
  );
}

export default App;