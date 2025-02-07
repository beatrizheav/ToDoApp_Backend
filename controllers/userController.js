const db = require("../config/db");

const createUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email, and password are required" });
  }

  db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    db.execute(
      "INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)",
      [name, email, password, avatar],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to create user" });
        }
        res.status(201).json({
          id: results.insertId,
          name,
          email,
        });
      }
    );
  });
};

const logInUser = (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password || !avatar) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    db.execute(
      "INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)",
      [name, email, password, avatar],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to create user" });
        }
        res.status(201).json({
          id: results.insertId,
          name,
          email,
        });
      }
    );
  });
};
module.exports = { getAllUsers, createUser, logInUser };
