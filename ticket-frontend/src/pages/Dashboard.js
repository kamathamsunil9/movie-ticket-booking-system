import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

import salaar from "../assets/movies/salaar.jpg";
import rrr from "../assets/movies/rrr.jpg";
import pushpa2 from "../assets/movies/pushpa2.jpg";
import peddi from "../assets/movies/peddi.jpg";

function Dashboard() {

  const movieImages = {
  Salaar: salaar,
  RRR: rrr,
  "Pushpa 2": pushpa2,
  Peddi: peddi,
};

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let decoded = null;

  if (token && token.split(".").length === 3) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

  const email = decoded?.sub;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get(`/booking/user/${email}`);
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        alert("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchBookings();
    }
  }, [email]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await API.delete(`/booking/cancel?bookingId=${bookingId}`);

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );

      alert("Booking Cancelled Successfully");
    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <p style={{ padding: "20px" }}>Loading bookings...</p>
      </>
    );
  }

  const totalBookings = bookings.length;

const totalMovies = new Set(
  bookings.map((b) => b.show?.movieName)
).size;

const totalTheaters = new Set(
  bookings.map((b) => b.show?.theater)
).size;

const totalSeats = bookings.reduce(
  (count, booking) => count + (booking.seats?.length || 0),
  0
);

  return (
    <div className="container">
      <div style={{ width: "100%" }}>
        <Navbar />

        <div className="container">

            <div className="welcome-card">

              <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
                  🎬 PVR Cinema Dashboard
              </h1>
              <h2>Welcome Back!</h2>

              <p
                style={{
                    color: "#666",
                    fontSize: "18px",
                    marginBottom: "25px",
                }}
          >
                  Manage your movie bookings and reserve your next seat.
              </p>

              <button
                onClick={() => navigate("/booking")}
                className="btn"
                  style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  borderRadius: "8px",
              }}
      >
          🎟 Book New Ticket
              </button>

      </div>

          <div className="dashboard-stats">
            <div className="stat-card">
            <h2>🎫</h2>
            <h3>{totalBookings}</h3>
            <p>Total Bookings</p>
          </div>

          <div className="stat-card">
            <h2>🎬</h2>
            <h3>{totalMovies}</h3>
            <p>Movies</p>
          </div>

          <div className="stat-card">
            <h2>🏢</h2>
            <h3>{totalTheaters}</h3>
            <p>Theaters</p>
          </div>

          <div className="stat-card">
            <h2>💺</h2>
            <h3>{totalSeats}</h3>
            <p>Seats Booked</p>
          </div>
        </div>
          

          <h3
            style={{
              marginTop: "30px",
              marginBottom: "20px",
              fontSize: "28px",
            }}
          >
            📋 Your Bookings ({bookings.length})
          </h3>

          {bookings.length === 0 ? (
            <p style={{ color: "gray" }}>
              No bookings yet. Go book your first seat
            </p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="card">

                  <div className="booking-content">

                  <div className="booking-details">

              <p>
                  🎭 <b>Theater:</b> {b.show?.theater}
              </p>

              <p>
                  🎬 <b>Movie:</b> {b.show?.movieName}
              </p>

              <p>
                  🕒 <b>Show Time:</b> {b.show?.showTime}
              </p>

              <p>
                  💺 <b>Seats:</b>{" "}
                    {b.seats?.map((s) => s.seatNumber).join(", ")}
              </p>

              <button
                  className="btn"
                  style={{
                  marginTop: "10px",
                  backgroundColor: "#dc3545",
                }}
                  onClick={() => handleCancelBooking(b.id)}
                >
                  ❌ Cancel Booking
            </button>

    </div>

              <img
                  src={movieImages[b.show?.movieName]}
                  alt={b.show?.movieName}
                  className="movie-poster"
              />

          </div>
  </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;