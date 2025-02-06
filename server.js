const express = require("express");
const cors = require("cors");
const app = express();
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");

require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Users
app.get("/users", userController.getAllUsers);
app.post("/users/registration", userController.createUser);
app.get("/users/auth", userController.logInUser);

//Routes Tasks
app.get("/tasks", taskController.getAllTasks);
app.get("/tasks/userTasks", taskController.getUserTasks);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
