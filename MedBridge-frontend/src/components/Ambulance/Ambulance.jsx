import React, { useState } from "react";
import AmbulanceBookingForm from "./AmbulanceBookingForm";
import AmbulanceTracker from "./AmbulanceTracker";
import DriverSender from "./DriverSender";

export default function Ambulance() {
  const [booking, setBooking] = useState(null);

  return (
    <div className="container mt-4">
      {!booking ? (
        <AmbulanceBookingForm onBooked={(b) => setBooking(b)} />
      ) : (
        <div className="row g-3">
          <div className="col-md-8">
            <AmbulanceTracker ambulanceId={booking.ambulance.id} />
          </div>
          <div className="col-md-4">
            <DriverSender ambulanceId={booking.ambulance.id} />
            <div className="card mt-3 p-2">
              <h6>Booking Details</h6>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(booking, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
