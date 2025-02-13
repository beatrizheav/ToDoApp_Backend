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

const createCategory = (req, res) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ message: "Data incomplete" });
  }

  db.execute(
    "INSERT INTO categories (user_id, name) VALUES (?, ?)",
    [user_id, name],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create category" });
      }
      res.status(201).json({
        id: results.insertId,
        user_id,
        name,
      });
    }
  );
};

const editCategory = (req, res) => {
  const { category_id, user_id, name } = req.body;

  if (!category_id || !user_id || !name) {
    return res.status(400).json({ message: "Data incomplete" });
  }

  db.execute(
    "UPDATE categories SET name = ? WHERE id = ? AND user_id = ?",
    [name, category_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to update category", error: err });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Category not found or not authorized" });
      }
      res.status(200).json({
        category_id,
        user_id,
        name,
      });
    }
  );
};

module.exports = {
  getAllCategories,
  getUserCategories,
  getCategory,
  createCategory,
  editCategory,
};
