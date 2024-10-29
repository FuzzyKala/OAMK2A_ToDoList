import { pool } from "../helper/db.js";
import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { sign } = jwt;
const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const result = await pool.query(
      "INSERT INTO account (email,password) values ($1,$2) returning *",
      [req.body.email, hashedPassword]
    );
    res
      .status(201)
      .json({ id: result.rows[0].id, email: result.rows[0].email });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM account where email=$1", [
      email,
    ]);

    if (result.rowCount === 0) return next(new Error("Invalid email"));
    const user = result.rows[0];
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return next(new Error("Invalid password"));

    const token = sign({ user: email }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ id: user.id, email: user.email, token: token });
  } catch (error) {
    next(error);
  }
});

export default router;
