import express from "express";
import cors from "cors";
import todoRouer from "./routers/todoRouter.js";
import userRouter from "./routers/userRouter.js";

const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", todoRouer);
app.use("/user", userRouter);

// Global Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
