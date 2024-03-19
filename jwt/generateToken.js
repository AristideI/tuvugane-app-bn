import jwt from "jsonwebtoken";

export default function generateToken(userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_KEY, {
    expiresIn: "15d",
  });

  return token;
}
