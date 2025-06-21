import jwt from "jsonwebtoken";
import envManager from "../config/envManager.js";

export const generateJwtToken = (id) => {
  return jwt.sign({ id }, envManager.JWT_SECRET, {
    expiresIn: "30d", // Token expiration time
  });
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, envManager.JWT_SECRET);
};
