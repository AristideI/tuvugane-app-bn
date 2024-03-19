import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

//create a new comment on a post
router.post("/:id", createComment);

// get post comments
router.get("/:id", getComments);

export default router;
