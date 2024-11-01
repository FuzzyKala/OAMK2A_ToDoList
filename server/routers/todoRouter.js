import { Router } from "express";
import { auth } from "../helpers/auth.js";
import {
  getTasks,
  postTask,
  deleteTaskById,
} from "../controllers/taskController.js";

const router = Router();

router.get("/", getTasks);
router.post("/create", auth, postTask);
router.delete("/delete/:id", auth, deleteTaskById);

export default router;
