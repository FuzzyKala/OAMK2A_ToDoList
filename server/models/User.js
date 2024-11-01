import { pool } from "../helpers/db.js";

const insertUser = async (email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO account (email,password) values ($1,$2) returning *",
    [email, hashedPassword]
  );
  return result;
};

const searchUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM account WHERE email = $1", [
    email,
  ]);
  return result;
};

export { insertUser, searchUserByEmail };
