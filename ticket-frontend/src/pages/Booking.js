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
        .then((res) => setAllSeats(res.data))
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
        <div className="booking-header">
          <h2>🎬 Movie Ticket Booking</h2>
          <p>Select your theater and seats</p>
        </div>

        {/* Theater Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <b>Select Theater:</b>
          </label>

          <select
            value={selectedShow}
            onChange={(e) => {
              setSelectedSeats([]);
              setSelectedShow(e.target.value);
            }}
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {shows.map((show) => (
              <option key={show.id} value={show.id}>
                {show.theater}
              </option>
            ))}
          </select>
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

        {/* Theater */}
        <div className="theater">

          <div className="screen">
            SCREEN
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