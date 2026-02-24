import jwt from "jsonwebtoken";
import { NotFoundError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";

const authenticatedSocket = async (socket, next) => {
  try {
    const token = socket.handshake.headers.access_token;

    if (!token) {
      return next(new UnauthenticatedError("Authentication invalid"));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return next(new UnauthenticatedError("Invalid token"));
    }

    const user = await User.findById(decode.userId);

    if (!user) {
      return next(new NotFoundError("User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    console.log("Socket authentication error:", error.message, "jjj");
    return next(new UnauthenticatedError("Authentication invalid"));
  }
};

export default authenticatedSocket;
