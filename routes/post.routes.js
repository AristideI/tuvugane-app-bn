import express from "express";
import {
  getAllPosts,
  getOnePost,
  likePost,
  createPost,
  getOneUsersPosts,
  unLikePost,
} from "../controllers/post.controller.js";

// Create a new router
const router = express.Router();

// create a new post
router.post("/", createPost);

// get all posts
router.get("/", getAllPosts);

// get one users posts
router.get("/users/:id", getOneUsersPosts);

// get one post
router.get("/:id", getOnePost);

// like a post
router.post("/:id/like", likePost);

// unlike a post
router.post("/:id/unlike", unLikePost);

export default router;
