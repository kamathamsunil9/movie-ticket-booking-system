import { useLocation, useNavigate } from "react-router-dom";

function BookingConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Booking Confirmed</h1>

        <p className="confirmation-subtitle">
          Your booking has been confirmed successfully.
        </p>

        {booking && (
          <div className="confirmation-details">

            <p>
              <b>🎬 Movie:</b> {booking.movie}
            </p>

            <p>
              <b>🎟 Seats:</b> {booking.seats.join(", ")}
            </p>

            <p>
              <b>🏢 Theater:</b> {booking.theater}
            </p>

            <p>
              <b>💰 Amount:</b> ₹{booking.amount}
            </p>

          </div>
        )}

        <button
          className="btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default BookingConfirmed;