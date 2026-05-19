import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const res = await API.get("/admin/bookings");

      setBookings(Array.isArray(res.data) ? res.data : []);
      setErrorMessage("");

    } catch (err) {
      setErrorMessage("❌ Failed to fetch admin bookings");
    } finally {
      setLoading(false);
    }
  };

  // Total booked seats count
  const totalSeatsBooked = bookings.reduce(
    (total, booking) => total + booking.seats.length,
    0
  );

  return (
    <>
      <Navbar />

      <div className="container">

        {/* Header */}
        <div className="admin-header">
          <h2>🎬 Admin Dashboard</h2>
          <p>Manage all cinema bookings</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>

          <div className="stat-card">
            <h3>{totalSeatsBooked}</h3>
            <p>Total Seats Booked</p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading bookings...</p>
        ) : bookings.length === 0 ? (

          <p style={{ color: "gray", textAlign: "center" }}>
            No bookings found
          </p>

        ) : (

          <div className="booking-grid">
            {bookings.map((b) => (
              <div key={b.id} className="admin-card">

                <h3>🎟 Booking #{b.id}</h3>

                <p>
                  <b>User:</b> {b.user?.email}
                </p>

                <p>
                  <b>Theater:</b> {b.show?.theater}
                </p>

                <p>
                  <b>Seats:</b>{" "}
                  {b.seats?.map((s) => s.seatNumber).join(", ")}
                </p>

                <p>
                  <b>Total Seats:</b> {b.seats?.length}
                </p>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;