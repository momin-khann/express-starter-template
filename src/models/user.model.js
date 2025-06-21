import mongoose from "mongoose";
import { encryptPassword } from "../utils/helper";
import { UserRolesEnum } from "../config/globalConst";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
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
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.keys(UserRolesEnum),
    },

    // todo: add new fields by yourself
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await encryptPassword(this.password);
    this.password = hashedPassword;
    next();
  }
});

userSchema.pre(
  ["find", "findById", "findByOne", "findByIdAndUpdate", "findOneAndUpdate"],
  function (next) {
    this.where = { isDeleted: false };
    next();
  }
);

export const User = mongoose.model("users", userSchema);
