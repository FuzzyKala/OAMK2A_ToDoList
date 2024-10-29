import { pool } from "../helper/db.js";
import { Router } from "express";
import { auth } from "../helper/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM task");
    res.status(200).json(result.rows || []);
  } catch (error) {
    console.error("Error executing query", error.stack);
    next(error);
  }
});

router.post("/create", auth, async (req, res, next) => {
  try {
    const result = await pool.query(
      "INSERT INTO task (description) values ($1) returning *",
      [req.body.description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", auth, async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Task with ID ${id} not found` });
    }
    res.status(200).json({ deletedId: id });
  } catch (error) {
    next(error);
  }
});

export default router;
