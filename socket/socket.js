import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

export const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const currentlyOnlineUsers = {};

export const getRecievedSocketId = (recieverId) => {
  return currentlyOnlineUsers[recieverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  currentlyOnlineUsers[userId] = socket.id
  io.emit("currentlyOnlineUsers", currentlyOnlineUsers);

  console.log("a user connected");
  socket.on("disconnect", () => {
    delete currentlyOnlineUsers[userId];
    io.emit("currentlyOnlineUsers", currentlyOnlineUsers);
    console.log("user disconnected");
  });
});
