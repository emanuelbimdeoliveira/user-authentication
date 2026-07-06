import express from "express";
import {
  createUser,
  getProfile,
  getUserById,
  loginByEmail,
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/me", authMiddleware, getProfile);
router.get("/profile/:id", getUserById);
router.post("/login", loginByEmail);

export default router;
