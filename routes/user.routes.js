import express from "express";
import {
  getAllUsers,
  getUser,
  changeBio,
} from "../controllers/user.controller.js";

// create a new router
const router = express.Router();

// get all users
router.get("/", getAllUsers);

// get a user by id
router.get("/:userId", getUser);

// update a user by id
router.put("/:userId", changeBio);

export default router;
