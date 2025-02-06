const db = require("../config/db");

const getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Database query error: ", err);
      return res
        .status(500)
        .json({ error: "Error retrieving users from database" });
    }
    res.json(results);
  });
};

const createUser = (req, res) => {
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

const logInUser = (req, res) => {
  const { email, password } = req.query;

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

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (results.length > 0) {
      const user = results[0];

      if (user.password === password) {
        res.status(200).json({
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    }
  });
};
module.exports = { getAllUsers, createUser, logInUser };
