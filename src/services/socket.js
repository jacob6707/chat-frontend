import { io } from "socket.io-client";
import { API_URL } from "../util/constants";

const URL = API_URL;

export const socket = io(URL, {
  auth: (cb) => {
    cb({ token: localStorage.getItem("token") || "" });
  },
  autoConnect: false,
});
