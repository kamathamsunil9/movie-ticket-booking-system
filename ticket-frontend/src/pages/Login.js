import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../assets/login-icon.png";
import API from "../services/api";

function Login() {
  console.log("SUNIL LOGIN FILE LOADED");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("USER");
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
        role: loginType
      });

      console.log("Backend Response:", res.data);

      // 2. SMART TOKEN EXTRACTION
      const token = typeof res.data === "object" ? res.data.token : res.data;

      if (token && token.split('.').length === 3) {
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
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      // --- FIXED EXTRACTION LOGIC ---
      if (err.response && err.response.data) {
        // If backend returned a plain text string, use it. 
        // If it's an object, check for .message, otherwise fall back to string layout
        const errorMsg = typeof err.response.data === "string" 
          ? err.response.data 
          : (err.response.data.message || "Something went wrong.");
        
        alert(errorMsg);
      } else {
        alert("Server connection failed. Please check if backend is running.");
      }
      // -------------------------------
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">🎬 PVR Cinema</h1>
        <div className="welcome-icon">
          <img
            src={loginIcon}
            alt="Cinema Icon"
            className="login-icon"
          />
        </div>

        <h2>Welcome Back!</h2>

        <p className="login-subtitle">
          Login to access your PVR Cinema account
        </p>

        <div className="login-role-selector">
          <p><b>Login As</b></p>

          <div className="role-options">
            <label>
              <input
                type="radio"
                value="USER"
                checked={loginType === "USER"}
                onChange={(e) => setLoginType(e.target.value)}
              />
              {/* Added standard safe text format */}
              <span> 👤 User</span>
            </label>

            <label>
              <input
                type="radio"
                value="ADMIN"
                checked={loginType === "ADMIN"}
                onChange={(e) => setLoginType(e.target.value)}
              />
              <span> 🛡️ Admin</span>
            </label>
          </div>
        </div>

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

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;