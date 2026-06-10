import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";

function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [allSeats, setAllSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Success & Error Messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Dynamic Shows
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(1);

  const [email, setEmail] = useState(null);

  const navigate = useNavigate();

  // Price configuration
  const pricePerSeat = 150;
  const totalPrice = selectedSeats.length * pricePerSeat;

  const availableSeats = allSeats.filter(
  (seat) => !seat.booked
).length;

  const bookedSeats = allSeats.filter(
  (seat) => seat.booked
).length;

  // Auth + Fetch Seats
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Invalid token check
    if (!token || token.split(".").length !== 3) {
      console.error("Invalid or missing token");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.sub);

      // Fetch all theaters
      API.get("/shows")
        .then((res) => {
          setShows(res.data);
        })
        .catch((err) => {
          console.error("Error fetching theaters:", err);
        });

      // Fetch ALL seats dynamically
API.get(`/booking/show/${selectedShow}/all-seats`)
  .then((res) => {

    const sortedSeats = [...res.data].sort((a, b) => {

      const rowA = a.seatNumber.charAt(0);
      const rowB = b.seatNumber.charAt(0);

      if (rowA !== rowB) {
        return rowA.localeCompare(rowB);
      }

      return (
        parseInt(a.seatNumber.substring(1)) -
        parseInt(b.seatNumber.substring(1))
      );
    });

    setAllSeats(sortedSeats);

  })
  .catch((err) => {
    console.error("Error fetching seats:", err);
    setErrorMessage("❌ Failed to load seats");
  });

    } catch (error) {
      console.error("Token decode failed:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate, selectedShow]);

  // Seat toggle
  const toggleSeat = (seat) => {

    if (seat.booked) return;

    if (selectedSeats.includes(seat.seatNumber)) {

      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat.seatNumber)
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat.seatNumber
      ]);
    }
  };

  // Booking Logic
  const bookSeats = async () => {

    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    if (selectedSeats.length === 0) {
      setErrorMessage("❌ Please select seats");
      return;
    }

    if (!email) {
      setErrorMessage("❌ Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {

      await API.post(
        `/booking/book?email=${email}&showId=${selectedShow}`,
        selectedSeats,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success
      setSuccessMessage("🎉 Booking Successful!");
      setSelectedSeats([]);

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);

    } catch (err) {

      const msg = err.response?.data || err.message;

      // Error
      setErrorMessage("❌ Booking failed: " + msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        {/* Header */}
        <div className="booking-header-card">

        <h2 className="booking-title">
          🎬 Movie Ticket Booking
        </h2>

        <p className="booking-subtitle">
          Select your theater and seats
        </p>

      <div>
        <label>
          <b>Select Theater:</b>
        </label>

      <select
        className="booking-select"
        value={selectedShow}
        onChange={(e) => {
          setSelectedSeats([]);
          setSelectedShow(e.target.value);
        }}
      >
        {shows.map((show) => (
          <option key={show.id} value={show.id}>
            {show.movieName} - {show.theater} ({show.showTime})
          </option>
        ))}
      </select>
    </div>

  </div>

        {/* Seat Legend */}
        <div className="legend">
          <div>
            <span className="seat available"></span> Available
          </div>

          <div>
            <span className="seat selected"></span> Selected
          </div>

          <div>
            <span className="seat booked"></span> Booked
          </div>
        </div>

        <div className="seat-stats">
          <div>🟢 Available Seats: {availableSeats}</div>
          <div>🔴 Booked Seats: {bookedSeats}</div>
        </div>

        {/* Theater */}
        <div className="theater">

          <div className="screen">
            SCREEN
          </div>

          <div className="entry-exit-bar">
                <span className="entry-label">🚪🚶 ENTRY</span>
                <span className="exit-label">EXIT 🚶🚪</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {allSeats.map((seat) => (

              <button
                key={seat.id}
                onClick={() => toggleSeat(seat)}
                disabled={seat.booked}
                className={`seat ${
                  seat.booked
                    ? "booked"
                    : selectedSeats.includes(seat.seatNumber)
                    ? "selected"
                    : "available"
                }`}
              >
                {seat.seatNumber}
              </button>

            ))}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {/* Footer */}
        <div className="booking-footer">

          <p>
            <b>Selected Seats:</b>{" "}
            {selectedSeats.length > 0
              ? selectedSeats.join(", ")
              : "None"}
          </p>

          <p>
            <b>Total Price:</b> ₹{totalPrice}
          </p>

          <button
            className="btn"
            onClick={bookSeats}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </div>
      </div>
    </>
  );
}

export default Booking;