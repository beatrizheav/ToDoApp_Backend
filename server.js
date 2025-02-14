const express = require("express");
const cors = require("cors");
const app = express();
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const categoryController = require("./controllers/categoryController");

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
app.post("/tasks/createTask", taskController.createTask);
app.put("/tasks/editTask", taskController.editTask);
app.delete("/tasks/deleteTask", taskController.deleteTask);

//Routes Categories
app.get("/categories", categoryController.getAllCategories);
app.get("/categories/userCategories", categoryController.getUserCategories);
app.get("/categories/category", categoryController.getCategory);
app.post("/categories/createCategory", categoryController.createCategory);
app.put("/categories/editCategory", categoryController.editCategory);
app.delete("/categories/deleteCategory", categoryController.deleteCategory);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
