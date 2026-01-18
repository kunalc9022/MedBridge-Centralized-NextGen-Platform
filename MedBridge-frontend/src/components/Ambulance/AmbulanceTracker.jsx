import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { connect, disconnect } from "../../services/websocketService";
import L from "leaflet";

// ✅ Import Leaflet marker images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function AmbulanceTracker({ ambulanceId }) {
  const [loc, setLoc] = useState({ latitude: 18.5204, longitude: 73.8567 });

  useEffect(() => {
    connect(ambulanceId, (data) => {
      setLoc({ latitude: data.latitude, longitude: data.longitude });
    });
    return () => disconnect();
  }, [ambulanceId]);

  return (
    <div className="card p-2">
      <h5>Live Tracking — Ambulance #{ambulanceId}</h5>
      <MapContainer
        center={[loc.latitude, loc.longitude]}
        zoom={13}
        style={{ height: "450px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[loc.latitude, loc.longitude]}>
          <Popup>Ambulance #{ambulanceId}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
