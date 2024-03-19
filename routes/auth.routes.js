import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

// create a new router
const router = express.Router();

//create new user
router.post("/signup", signup);

//login user
router.post("/login", login);

//logout user
router.post("/logout", logout);

export default router;
