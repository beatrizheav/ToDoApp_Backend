const express = require("express");
const cors = require("cors");
const app = express();
const userController = require("./controllers/userController");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/users", userController.getAllUsers);
app.post("/users/registration", userController.createUser);
app.get("/users/auth", userController.logInUser);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
