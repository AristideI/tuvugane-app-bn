import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function validateUserJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    //check if Authorisation header is present
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No bearer token provided" });
    }
    //     extract token
    const token = authHeader.split(" ")[1];

    //     check if token is present
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No bearer token provided" });
    }

    //     verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     check if token is valid
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised - Invalid Token" });
    }

    //     check if user exists
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
