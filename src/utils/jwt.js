import jwt from "jsonwebtoken";
import envManager from "../config/envManager";

export const generateToken = (id) => {
  return jwt.sign({ id }, envManager.JWT_SECRET, {
    expiresIn: "30d", // Token expiration time
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, envManager.JWT_SECRET);
};
