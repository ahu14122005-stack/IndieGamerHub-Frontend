import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function GameDetails({ dark }) {
  const location = useLocation();
  const { id } = useParams();

  // ✅ FIX: use state OR fetch fallback
  const [game, setGame] = useState(location.state?.game || null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [favorite, setFavorite] = useState(false);

  // ✅ FETCH if game not passed
  useEffect(() => {
    if (!game) {
      fetch(`https://indiegamerhub-backend.onrender.com/api/games/${id}`)
        .then(res => res.json())
        .then(data => setGame(data))
        .catch(err => console.log(err));
    }
  }, [id, game]);

  // ✅ Show loading instead of "not found"
  if (!game) return <h2>Loading...</h2>;

  const extraImages =
    game.short_screenshots && game.short_screenshots.length > 0
      ? game.short_screenshots
      : [
          "https://via.placeholder.com/150?text=Extra+Image+1",
          "https://via.placeholder.com/150?text=Extra+Image+2",
          "https://via.placeholder.com/150?text=Extra+Image+3",
        ];

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { id: Date.now(), text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${game.background_image})`, // ✅ FIXED syntax
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        color: dark ? "#fff" : "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{game.name}</h1>

        <img
          src={game.background_image}
          alt={game.name}
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "10px",
            marginBottom: "20px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            marginBottom: "20px",
          }}
        >
          {extraImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${game.name}-extra-${index}`} // ✅ FIXED syntax
              style={{
                width: "150px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setFavorite(!favorite)}
          style={{
            marginBottom: "20px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: favorite ? "#ff4d4d" : "#00ffcc",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {favorite ? "❤️ Favorited" : "♡ Add to Favorites"}
        </button>

        <p style={{ maxWidth: "800px", textAlign: "center", marginBottom: "20px" }}>
          {game.description_raw || "Play the Games and Enjoy your Thrill."}
        </p>

        <div style={{ marginBottom: "20px" }}>
          <a
            href={
              game.trailer
                ? game.trailer
                : `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    game.name + " trailer"
                  )}`
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#04924b", fontWeight: "bold", fontSize: "16px" }}
          >
            {game.trailer ? "Watch Trailer" : "Trailer not available — Search on YouTube"}
          </a>
        </div>

        <h2>Comments / Reviews</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "600px",
            marginBottom: "20px",
          }}
        >
          {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}
          {comments.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: dark ? "#222" : "#eee",
              }}
            >
              {c.text}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "600px",
            width: "100%",
            marginBottom: "50px",
          }}
        >
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: dark ? "#222" : "#fff",
              color: dark ? "#fff" : "#000",
            }}
          />
          <button
            onClick={addComment}
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#00ffcc",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;