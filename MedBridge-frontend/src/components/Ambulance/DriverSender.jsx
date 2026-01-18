import React, { useEffect } from "react";

import { sendLocation } from "../../services/websocketService";

export default function DriverSender({ ambulanceId }) {
  useEffect(() => {
    // starting coordinates (fallback)
    let lat = 18.5204;
    let lng = 73.8567;

    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            sendLocation(
              ambulanceId,
              pos.coords.latitude,
              pos.coords.longitude
            );
            console.log(
              "Sent real coords",
              pos.coords.latitude,
              pos.coords.longitude
            );
          },
          (err) => {
            // fallback: fake movement
            lat += (Math.random() - 0.5) / 500;
            lng += (Math.random() - 0.5) / 500;
            sendLocation(ambulanceId, lat, lng);
            console.log("Sent fake coords", lat, lng);
          }
        );
      } else {
        lat += (Math.random() - 0.5) / 500;
        lng += (Math.random() - 0.5) / 500;
        sendLocation(ambulanceId, lat, lng);
        console.log("Sent fake coords (no geolocation)", lat, lng);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [ambulanceId]);

  return (
    <div className="card p-2">
      <h6>Driver Sender</h6>
      <p>Sending updates for ambulance #{ambulanceId} every 5s.</p>
    </div>
  );
}
