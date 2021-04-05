import io from "socket.io-client";
const socket = io(
  process.env.REACT_APP_WEBSOCKET_URI || "http://localhost:8001"
);
export default socket;
