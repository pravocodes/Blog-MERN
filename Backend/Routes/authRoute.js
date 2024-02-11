import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  updateProfileController,
} from "../Controllers/authController.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { requireSignIn } from "../Middleware/authMiddleware.js";

const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfileController);

export default router;
