import Comment from "../models/comment.model.js";

export async function createComment(req, res) {
  try {
    const authorId = req.user._id;
    const { content } = req.body;
    const postId = req.params.id;
    const comment = await Comment.create({ authorId, content });
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json(comment);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

//get comments for a post
export async function getComments(req, res) {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId });
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}
