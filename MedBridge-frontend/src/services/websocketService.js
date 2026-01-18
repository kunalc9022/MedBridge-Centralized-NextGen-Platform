import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;

/**
 * Connect and subscribe to a topic specific to ambulanceId.
 * onMessage receives parsed message body.
 */
export function connect(ambulanceId, onMessage) {
  if (client && client.active) {
    // already connected; (re)subscribe
    try {
      client.subscribe(`/ambulance/location/${ambulanceId}`, (msg) => {
        onMessage(JSON.parse(msg.body));
      });
      return;
    } catch (e) {
      // fallthrough to recreate
    }
  }

  client = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe(`/ambulance/location/${ambulanceId}`, (msg) => {
        onMessage(JSON.parse(msg.body));
      });
      console.log(
        "WS connected, subscribed to /ambulance/location/" + ambulanceId
      );
    },
    onStompError: (frame) => {
      console.error("STOMP error", frame);
    },
  });

  client.activate();
}

export function sendLocation(ambulanceId, lat, lng) {
  if (!client || !client.active) return;
  client.publish({
    destination: "/app/ambulance/update-location",
    body: JSON.stringify({ ambulanceId, latitude: lat, longitude: lng }),
  });
}

export function disconnect() {
  if (client) client.deactivate();
}
