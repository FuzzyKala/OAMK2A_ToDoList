import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "29739300",
  port: 5432,
});
const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/create", async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO task (description) values ($1) returning *",
      [req.body.description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Task with ID ${id} not found` });
    }
    res.status(200).json({ deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
