import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
    try {
        await API.post("/auth/register", {
        name,
        email,
        password,
        role: "USER"
        });

        alert("Registration successful!");
        navigate("/login");

    } catch (err) {
        alert(err.response?.data || "Registration failed");
    }
    };

    return (
    <div className="login-container">
        <div className="login-card">

        <h1 className="logo">🎬 PVR Cinema</h1>

        <div className="welcome-icon">
        🍿
        </div>

<h2>Create Account</h2>

<p className="login-subtitle">
    Create your PVR Cinema account
</p>

        <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleRegister}>
            Register
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
            Already have an account?{" "}
        <span
            onClick={() => navigate("/login")}
            style={{
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: "bold"
    }}
>
    Login
    </span>
</p>

        </div>
    </div>
    );
}

export default Register;