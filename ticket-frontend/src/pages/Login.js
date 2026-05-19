import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 1. Break the loop: Clear any old/broken tokens when the Login page loads
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Backend Response:", res.data);

      // 2. SMART TOKEN EXTRACTION
      // Checks if the response is an object { token: "..." } or just the string "..."
      const token = typeof res.data === "object" ? res.data.token : res.data;

      if (token && token.split('.').length === 3) {
        // Only save if it looks like a valid 3-part JWT
       localStorage.setItem("token", token);

         // Decode JWT payload
        const payload = JSON.parse(atob(token.split(".")[1]));

        alert("Login successful! 🎫");

        // Redirect based on role
      if (payload.role === "ADMIN") {
      navigate("/admin");
      } else {
        navigate("/dashboard");
    }
      } else {
        console.error("Received invalid token format:", token);
        alert("Login failed: Server returned an invalid session token.");
      }

    } catch (err) {
      console.error("Login Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      alert(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <p>Enter your credentials to access PVR Cinema</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn-login">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;