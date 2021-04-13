import io from "socket.io-client";
import { api } from "../res/api";

const socket = io(api);
export default socket;
