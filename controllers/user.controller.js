import User from "../models/user.model.js";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function changeBio(req, res) {
  try {
    const userId = req.params.userId;
    const { bio } = req.body;
    const currentUser = req.user._id;
    if (userId !== currentUser) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId, { bio }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.bio = bio;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
