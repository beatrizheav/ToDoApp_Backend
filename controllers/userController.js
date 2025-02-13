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

    // Insert the new user into the 'users' table
    db.execute(
      "INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)",
      [name, email, password, avatar],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to create user" });
        }

        const userId = results.insertId; // Get the newly inserted user's ID

        // Insert 3 categories for the newly created user
        const categories = [
          ["Home", userId],
          ["Work", userId],
          ["Personal", userId],
        ];

        db.execute(
          "INSERT INTO categories (name, user_id) VALUES (?, ?), (?, ?), (?, ?)",
          categories.flat(),
          (err, results) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ message: "Failed to create categories" });
            }

            // Return the response with user data
            res.status(201).json({
              id: userId,
              name,
              email,
              password,
              avatar,
              message: "User created successfully, and categories added",
            });
          }
        );
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
            password: user.password,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    }
  });
};
module.exports = { getAllUsers, createUser, logInUser };
