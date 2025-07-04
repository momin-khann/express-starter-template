import argon from "argon2";

export async function encryptPassword(password) {
  return await argon.hash(password);
}

export async function verifyPassword(dbPass, userPass) {
  return await argon.verify(dbPass, userPass);
}

export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const extractAccessToken = (req) => {
  return req?.cookies?.accessToken || req?.headers?.authorization.split(" ")[1];
};

export const extractRefreshToken = (req) => {
  return req?.cookies?.refreshToken || req?.headers?.authorization.split(" ")[1];
};
