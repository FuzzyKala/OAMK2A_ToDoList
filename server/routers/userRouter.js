import { Router } from "express";
import dotenv from "dotenv";
import { registration, login } from "../controllers/userController.js";

dotenv.config();

const router = Router();

router.post("/register", registration);
router.post("/login", login);

export default router;
