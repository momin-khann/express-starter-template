import mongoose from "mongoose";
import { encryptPassword, verifyPassword } from "../utils/helper.js";
import { UserRolesEnum } from "../config/globalConst.js";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is requred"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.keys(UserRolesEnum),
      default: UserRolesEnum.USER,
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    accessToken: String,
    refreshToken: String,
    // todo: add new fields by yourself
  },

  { timestamps: true }
);

// compound index - index on multiple fields
// 1 means - ascending ,  -1 means descending
userSchema.index({ verificationToken: 1, verificationTokenExpiresAt: 1 });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await encryptPassword(this.password);
    this.password = hashedPassword;
  }
  next();
});

userSchema.pre(
  ["find", "findById", "findByOne", "findByIdAndUpdate", "findOneAndUpdate"],
  function (next) {
    this.where = { isDeleted: false };
    next();
  }
);

userSchema.methods.verifyPassword = async function (password) {
  return await verifyPassword(this.password, password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("users", userSchema);
