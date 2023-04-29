import { Server } from "socket.io";
import Product from "../../src/db/product";

export default function handler(req, res) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("product-update", (data) => {
      socket.broadcast.emit("product-update", data);
    });
    socket.on("user-update", (data) => {
      socket.broadcast.emit("user-update", data);
    });
  });
  res.end();
}
