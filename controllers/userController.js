const db = require("../config/db");

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, name, email });
  });
};

module.exports = { getAllUsers, createUser };
