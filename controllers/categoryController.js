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
    return res.status(400).json({ message: "Data create incomplete" });
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
  const { id, user_id, name } = req.body;

  if (!id || !user_id || !name) {
    return res.status(400).json({ message: "Data edit incomplete" });
  }

  db.execute(
    "UPDATE categories SET name = ? WHERE id = ? AND user_id = ?",
    [name, id, user_id],
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
        id,
        user_id,
        name,
      });
    }
  );
};

const deleteCategory = (req, res) => {
  const { id, userId } = req.query;

  if (!id || !userId) {
    return res
      .status(400)
      .json({ message: "Category ID and User ID are required" });
  }

  db.query(
    "SELECT id FROM categories WHERE name = 'No category' AND user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to check for 'No category'" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "'No category' does not exist for this user" });
      }

      const noCategoryId = results[0].id;

      db.query(
        "UPDATE tasks SET category_id = ? WHERE category_id = ? AND user_id = ?",
        [noCategoryId, id, userId],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update tasks" });
          }

          db.query(
            "DELETE FROM categories WHERE id = ? AND user_id = ?",
            [id, userId],
            (err, results) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ message: "Failed to delete category" });
              }

              if (results.affectedRows === 0) {
                return res
                  .status(404)
                  .json({ message: "Category not found for this user" });
              }

              res.status(200).json({
                message: "Category deleted and tasks updated successfully",
                id: id,
              });
            }
          );
        }
      );
    }
  );
};

module.exports = {
  getAllCategories,
  getUserCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
};
