import express from "express";
import {
  login,
  logout,
  refreshToken,
  register
} from "../controller/auth/auth.js";
import { checkEmail } from "../controller/auth/email.js";
import authenticateUser from "../middleware/authentication.js";
import { signInWithOauth } from "../controller/auth/oauth.js";
import { sendOTP, verifyOTP } from "../controller/auth/otp.js";
import {
  getProfile,
  setLoginPinFirst,
  updateProfile,
  verifyPin
} from "../controller/auth/user.js";
import {
  uploadBiometrics,
  verifyBiometrics
} from "../controller/auth/biometrics.js";

const router = express.Router();

router.post("/refresh-token", refreshToken);
router.post("/logout", authenticateUser, logout);
router.post("/register", register);
router.post("/login", login);
router.post("/check-email", checkEmail);
router.post("/oauth", signInWithOauth);
router.post("/verify-otp", verifyOTP);
router.post("/send-otp", sendOTP);

router
  .route("/profile")
  .get(authenticateUser, getProfile)
  .put(authenticateUser, updateProfile);

router.post("/set-pin", authenticateUser, setLoginPinFirst);
router.post("verify-pin", authenticateUser, verifyPin);
router.post("/upload-biometric", authenticateUser, uploadBiometrics);
router.post("/verify-biometric", authenticateUser, verifyBiometrics);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticateUser, logout);

export default router;
