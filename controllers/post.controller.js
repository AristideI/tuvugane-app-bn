import Post from "../models/post.model.js";

// create a new post
export async function createPost(req, res) {
  try {
    const authorId = req.user._id;
    const { content, image } = req.body;
    const post = await Post.create({ authorId, content, image });
    return res.status(201).json(post);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

//get all posts
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate("authorId").populate("comments");
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

// get one post
export async function getOnePost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("authorId")
      .populate("comments");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

//get one users posts
export function getOneUsersPosts(req, res) {
  try {
    const { id } = req.params;
    const posts = Post.find({ authorId: id }).populate("authorId");
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

//like a post
export async function likePost(req, res) {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "You already liked this post" });
    }
    post.likes.push(userId);
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

//unlike post
export async function unLikePost(req, res) {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ error: "You have not liked this post" });
    }
    post.likes = post.likes.filter((like) => like !== userId);
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}
