const db = require("../config/db");

const getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      console.error("Database query error: ", err);
      return res
        .status(500)
        .json({ error: "Error retrieving tasks from database" });
    }
    res.json(results);
  });
};

const getUserCategories = (req, res) => {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "User ID are required" });
  }

  db.query(
    "SELECT * FROM categories WHERE user_id = ?",
    [user],
    (err, results) => {
      if (err) {
        console.error("Database query error: ", err);
        return res
          .status(500)
          .json({ error: "Error retrieving categories from database" });
      }
      if (results.length === 0) {
        return res.status(404).json({
          message: "Invalid user",
        });
      }
      res.json(results);
    }
  );
};

const getCategory = (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Category ID are required" });
  }

  db.query("SELECT * FROM categories WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Database query error: ", err);
      return res
        .status(500)
        .json({ error: "Error retrieving category from database" });
    }
    if (results.length === 0) {
      return res.status(404).json({
        message: "Invalid id",
      });
    }
    res.json(results[0]);
  });
};

module.exports = { getAllCategories, getUserCategories, getCategory };
