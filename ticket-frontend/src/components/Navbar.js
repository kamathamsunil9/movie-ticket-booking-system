import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();

  // Get token
  const token = localStorage.getItem("token");

  let role = null;

  // Decode role safely
  if (token && token.split(".").length === 3) {
    try {
      const decoded = jwtDecode(token);

      console.log("Decoded Token:", decoded);

      // Extract role correctly
      role = decoded.role || decoded.authorities;

    } catch (err) {
      console.error("Invalid token");
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">

      {/* LEFT SIDE LINKS */}
      <div className="nav-links">

        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>

        <Link to="/booking" className="nav-link">
          Booking
        </Link>

        {/* ADMIN ONLY */}
        {role === "ADMIN" && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}

      </div>

      {/* RIGHT SIDE */}
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Navbar;