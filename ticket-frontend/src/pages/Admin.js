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

  const handleCancelBooking = async (bookingId) => {
    try {

      await API.delete(`/booking/cancel?bookingId=${bookingId}`);

      setBookings((prevBookings) =>
        prevBookings.filter(
          (booking) => booking.id !== bookingId
        )
      );

      alert("Booking Cancelled Successfully");

    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  // Total booked seats
  const totalSeatsBooked = bookings.reduce(
    (total, booking) => total + booking.seats.length,
    0
  );

  // Theater statistics
  const theaterStats = bookings.reduce((acc, booking) => {

    const theater = booking.show?.theater;

    if (!acc[theater]) {
      acc[theater] = 0;
    }

    acc[theater]++;

    return acc;

  }, {});

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

        {/* Statistics Cards */}
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

        {/* Theater Statistics */}
        <div
          className="card"
          style={{
            marginBottom: "20px",
            padding: "20px"
          }}
        >
          <h3>🎭 Theater Statistics</h3>

          {Object.entries(theaterStats).length === 0 ? (
            <p>No theater bookings yet</p>
          ) : (
            Object.entries(theaterStats).map(
              ([theater, count]) => (
                <p key={theater}>
                  <b>{theater}</b> : {count} Booking(s)
                </p>
              )
            )
          )}
        </div>

        {/* Loading */}
        {loading ? (

          <p style={{ textAlign: "center" }}>
            Loading bookings...
          </p>

        ) : bookings.length === 0 ? (

          <p
            style={{
              color: "gray",
              textAlign: "center"
            }}
          >
            No bookings found
          </p>

        ) : (

          <div className="booking-grid">

            {bookings.map((b) => (

              <div
                key={b.id}
                className="admin-card"
              >

                <h3>🎟 Booking #{b.id}</h3>

                <p>
                  <b>User:</b>{" "}
                  {b.user?.email}
                </p>

                <p>
                  <b>Theater:</b> {b.show?.theater}
                </p>

                <p>
                  <b>Movie:</b> {b.show?.movieName}
                </p>

                <p>
                  <b>Show Time:</b> {b.show?.showTime}
                </p>

                <p>
                  <b>Seats:</b>{" "}
                  {b.seats?.map((s) => s.seatNumber).join(", ")}
                </p>

                <button
                  className="btn"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#dc3545"
                  }}
                  onClick={() =>
                    handleCancelBooking(b.id)
                  }
                >
                  Cancel Booking
                </button>

              </div>

            ))}

          </div>

        )}
      </div>
    </>
  );
}

export default Admin;