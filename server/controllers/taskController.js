import { selectAllTask, insertTask, deleteTask } from "../models/Task.js";
import { ApiError } from "../helpers/apiError.js";

const getTasks = async (req, res, next) => {
  try {
    const result = await selectAllTask();
    return res.status(200).json(result.rows || []);
  } catch (error) {
    return next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    const description = req.body.description;
    if (!description || description.length === 0)
      return next(new ApiError("Invalid description", 400));

    const result = await insertTask(description);
    return res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    return next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return next(new ApiError("Invalid id", 400));

    const result = await deleteTask(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Task with ID ${id} not found` });
    }
    res.status(200).json({ deletedTaskId: id });
  } catch (error) {
    next(error);
  }
};

export { getTasks, postTask, deleteTaskById };
