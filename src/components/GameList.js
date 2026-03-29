import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GameList({ dark, setDark }) {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://indiegamerhub-backend.onrender.com/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        background: "linear-gradient(-45deg, #bb3c15, #e73c7e, #23a6d5, #40c5a6)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 2s ease infinite",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Title & Search Bar */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "20px",
          background: dark ? "#333" : "#ddd",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ margin: 0 }}>IndieGamer Hub</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "250px",
            }}
          />
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Games Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/game/${game.id}`, { state: { game } })}
            style={{
              border: dark ? "1px solid #fff" : "1px solid #222",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: dark ? "#222" : "#fff",
              color: dark ? "#fff" : "#000",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = dark
                ? "0 0 15px #00ffcc"
                : "0 0 15px #888";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={game.background_image}
              alt={game.name}
              style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
            />
            <h3 style={{ margin: "5px 0" }}>{game.name}</h3>
            <p style={{ margin: 0 }}>⭐ {game.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameList;