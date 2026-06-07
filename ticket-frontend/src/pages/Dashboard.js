import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";

function Dashboard() {
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

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        <button
          onClick={() => navigate("/booking")}
          className="btn"
        >
          Go to Booking
        </button>

        <h3 style={{ marginTop: "20px" }}>
          Your Bookings ({bookings.length})
        </h3>

        {bookings.length === 0 ? (
          <p style={{ color: "gray" }}>
            No bookings yet. Go book your first seat
          </p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="card">
              <p><b>Booking ID:</b> {b.id}</p>

              <p><b>Theater:</b> {b.show?.theater}</p>

              <p><b>Movie:</b> {b.show?.movieName}</p>

              <p><b>Show Time:</b> {b.show?.showTime}</p>

              <p><b>Seats:</b> {b.seats?.map(s => s.seatNumber).join(", ")}</p>

              <button
                className="btn"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#dc3545",
                }}
                onClick={() => handleCancelBooking(b.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;