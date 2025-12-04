import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { type } from "os";
import { match } from "assert";
import { timeStamp } from "console";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address"
      ]
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      maxlength: 50,
      minlength: 3
    },
    login_pin: {
      type: String,
      minlength: 4,
      maxlength: 4
    },
    phone_number: {
      type: String,
      match: [/^[0-9]{10}$/, "Please fill a valid 10-digit phone number"],
      uniqueq: true,
      sparse: true
    },
    date_of_birth: Date,
    biometricKey: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },
    wrong_pin_attempts: {
      type: Number,
      default: 0
    },
    blocked_until_password: {
      type: Date,
      default: null
    },
    balance: {
      type: Number,
      default: 50000.0
    }
  },
  {
    timeStamps: true
  }
);
