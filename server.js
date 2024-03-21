import { app, server } from "./socket/socket.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

//custom imports
import connectToDB from "./db/connectToDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import commentRouter from "./routes/comment.routes.js";
import postRouter from "./routes/post.routes.js";
import validateUserJWT from "./guards/validateUserJWT.js";

//Configurations
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Constants
const port = process.env.PORT || 4000;

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
// Authentication routes
app.use("/auth", authRouter);

//Users routes
app.use("/users", validateUserJWT, userRouter);

//Posts routes
app.use("/posts", validateUserJWT, postRouter);

//Conversations routes
app.use("/conversations", validateUserJWT, conversationRouter);

//Messages routes
app.use("/messages", validateUserJWT, messageRouter);

//Comments routes
app.use("/comments", validateUserJWT, commentRouter);

//Server listening
server.listen(port, () => {
  console.log("listening on *: ", port);
  connectToDB();
});
