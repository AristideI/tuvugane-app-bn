import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../jwt/generateToken.js";

export async function signup(req, res) {
  try {
    const { fullname, username, email, gender, profilePic } = req.body;

    //check if user already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    //return success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("We had an error, ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    //check if user exists
    const currentUser = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(password, currentUser.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //generate token
    const token = generateToken(currentUser._id);

    const userResponse = {
      _id: currentUser._id,
      fullname: currentUser.fullname,
      username: currentUser.username,
      email: currentUser.email,
      profilePic: currentUser.profilePic,
      gender: currentUser.gender,
      bio: currentUser.bio,
    };

    //return response
    res.status(200).json({ ...userResponse, token });
  } catch (error) {
    console.log("We had an error, ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("We had an error, ", error.message);
    res.status(500).json({ error: "An Error Occured" });
  }
}
