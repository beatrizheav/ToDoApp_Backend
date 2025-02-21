const db = require("../config/db");

const getAllTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error("Database query error: ", err);
      return res
        .status(500)
        .json({ error: "Error retrieving tasks from database" });
    }
    res.json(results);
  });
};

const getUserTasks = (req, res) => {
  const { date, user } = req.query;

  if (!date || !user) {
    return res.status(400).json({ error: "Date and user ID are required" });
  }

  db.query(
    "SELECT * FROM tasks WHERE due_date = ? AND user_id = ?",
    [date, user],
    (err, results) => {
      if (err) {
        console.error("Database query error: ", err);
        return res
          .status(500)
          .json({ error: "Error retrieving tasks from database" });
      }
      if (results.length === 0) {
        return res.status(404).json({
          message: "No tasks found on the specified date",
        });
      }
      res.json(results);
    }
  );
};

const createTask = (req, res) => {
  const { user_id, name, category_id, description, due_date, priority } =
    req.body;

  if (
    !user_id ||
    !name ||
    !category_id ||
    !description ||
    !due_date ||
    !priority
  ) {
    return res.status(400).json({ message: "Data incomplete" });
  }

  const status = "to do";

  db.execute(
    "INSERT INTO tasks (user_id, name, category_id, description, status, due_date, priority) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [user_id, name, category_id, description, status, due_date, priority],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create task" });
      }
      res.status(201).json({
        id: results.insertId,
        user_id,
        name,
        category_id,
        description,
        status,
        due_date,
        priority,
      });
    }
  );
};

const editTask = (req, res) => {
  const { taskId, name, category_id, description, due_date, priority } =
    req.body;

  if (
    !taskId ||
    !name ||
    !category_id ||
    !description ||
    !due_date ||
    !priority
  ) {
    return res.status(400).json({ message: "Data incomplete" });
  }

  db.query(
    "UPDATE tasks SET name = ?, category_id = ?, description = ?, due_date = ?, priority = ? WHERE id = ?",
    [name, category_id, description, due_date, priority, taskId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to edit task" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({
        id: taskId,
        name,
        category_id,
        description,
        due_date,
        priority,
      });
    }
  );
};

const editTaskStatus = (req, res) => {
  const { taskId, status } = req.body;

  if (!taskId || !status) {
    return res.status(400).json({ message: "Data incomplete" });
  }

  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, taskId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to edit status" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({
        id: taskId,
        status,
      });
    }
  );
};

const deleteTask = (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete task" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", id: id });
  });
};

module.exports = {
  getAllTasks,
  getUserTasks,
  createTask,
  editTask,
  editTaskStatus,
  deleteTask,
};
