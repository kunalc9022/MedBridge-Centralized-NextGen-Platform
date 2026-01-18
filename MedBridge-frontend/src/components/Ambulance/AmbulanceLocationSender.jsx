import React, { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const AmbulanceLocationSender = ({ ambulanceId }) => {
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");

      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const locationData = {
            ambulanceId: ambulanceId,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          client.publish({
            destination: "/app/ambulance/update-location",
            body: JSON.stringify(locationData),
          });
        });
      }, 5000);

      // Cleanup on unmount
      return () => clearInterval(intervalId);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [ambulanceId]);

  return <p>Sending location updates for ambulance #{ambulanceId}...</p>;
};

export default AmbulanceLocationSender;
