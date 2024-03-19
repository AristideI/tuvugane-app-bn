import { app, server } from "./socket/socket.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

//custom imports
import connectToDB from "./db/connectToDB.js";
import authRouter from "./routes/auth.routes.js";

//Configurations
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Constants
const port = process.env.PORT || 4000;

//Routes
// Authentication routes
app.use("/auth", authRouter);

//Server listening
server.listen(port, () => {
  console.log("listening on *: ", port);
  connectToDB();
});
