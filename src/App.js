import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : "light"}>
      <Router>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<GameList dark={dark} setDark={setDark} />} />
            <Route path="/game/:id" element={<GameDetails dark={dark} />} />
          </Routes>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </Router>
    </div>
  );
}

export default App;