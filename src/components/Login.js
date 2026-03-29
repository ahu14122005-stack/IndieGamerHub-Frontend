import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // prevent page refresh
    if (username && password) {
      setMessage("🔥 Thank you for logging in!");
      // Call onLogin immediately so App shows home page
      setTimeout(() => {
        onLogin();
      }, 1000); // slight delay to show message
    } else {
      setMessage("⚠️ Please enter username & password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🎮 IndieGamer Hub</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">LOGIN</button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Login;