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

export const extractToken = (req) => {
  return req?.cookies?.token || req?.headers?.authorization.split(" ")[1];
};
