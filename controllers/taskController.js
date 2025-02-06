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

module.exports = { getAllTasks, getUserTasks };
