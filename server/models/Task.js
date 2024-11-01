import { pool } from "../helpers/db.js";

const selectAllTask = async () => {
  const result = await pool.query("SELECT * FROM task");
  return result;
};

const insertTask = async (description) => {
  const result = await pool.query(
    "INSERT INTO task (description) values ($1) returning *",
    [description]
  );
  return result;
};

const deleteTask = async (id) => {
  const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);
  return result;
};

export { selectAllTask, insertTask, deleteTask };
