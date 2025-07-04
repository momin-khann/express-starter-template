import jwt from "jsonwebtoken";
import envManager from "../config/envManager.js";
import { nodeEnv } from "../config/globalConst.js";

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = envManager;

export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const generateAccessToken = (userId, res) => {
  const accessToken = jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const options = {
    httpOnly: true,
    secure: envManager.NODE_ENV === nodeEnv.PROD,
  };

  res.cookie("accessToken", accessToken, options);

  return accessToken;
};

export const generateAccessAndRefreshToken = (userId, res) => {
  const accessToken = jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  const options = {
    httpOnly: true,
    secure: envManager.NODE_ENV === nodeEnv.PROD,
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  return { accessToken, refreshToken };
};

export const setTokensIntoCookie = (res, accessToken, refreshToken) => {
  const options = {
    httpOnly: true,
    secure: envManager.NODE_ENV === nodeEnv.PROD,
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);
};
