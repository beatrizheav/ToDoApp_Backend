# To-Do App Backend

This repository contains the backend API for the To-Do List app. The backend serves as the core service to manage tasks, user authentication, and other app-related functionalities. It provides a RESTful API for interacting with the app's front end.

---

## Features

- **Task Management**: Create, update, delete, and retrieve tasks.
- **User Authentication**: Secure user login and registration.
- **Data Persistence**: Tasks and user data are stored in a database.
- **Basic Controllers**: Sample controllers for basic testing and setup.

---

## Project Structure

The backend project is organized as follows:

- `controllers/` # Contains controller files for routing logic
- `config/` # Configuration files (e.g., database, environment settings)
  - `db.js` # Database connection setup
- `server.js` # Entry point for the backend server
- `.gitignore` # Git ignore file (excludes node_modules, .env files, etc.)
- `CODEOWNERS` # Defines code ownership for pull requests
- `queries` # Queries to create the db, clean and add content to the tables

## Installation

**Prerequisites**
Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (for running the backend)
- [MySQL](https://www.mysql.com/) (for the database)
- [Git](https://git-scm.com/) (for cloning the repository)

## Steps to Set Up the Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/beatrizheav/ToDoApp_Backend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd ToDoApp_Backend.git
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of your project (if you don't already have one) and configure your database connection. Example:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your-password
   DB_NAME=your-database-name
   ```

5. After cloning the repository, navigate to the `queries` folder, where you’ll find the createDB.sql file with the necessary SQL queries to set up the database.

6. Log in to MySQL and create the database:

   ```bash
   mysql -u root -p
   ```

Execute the SQL queries to create the necessary tables. You can find these queries in the `queries` folder on the createDB.sql file. Run each query in the MySQL terminal:

7. Verify that the tables were created by checking the database schema:

   ```sql
   SHOW TABLES;
   ```

8. After setting up the database, you can start the backend server:

   ```bash
   npm run server
   ```

9. The server will start, and you can begin using the backend API at `http://localhost:5001` (or whichever port you configured in the project).

## API Endpoints

**Users**

- **GET** `/users` - Get all users
- **POST** `/user/registration` - Create a new user
- **GET** `/users/auth` - Log in a user

**Tasks**

- **GET** `/tasks` - Get all tasks
- **GET** `/tasks/userTasks` - Get tasks assigned to a user
- **POST** `/tasks/createTask` - Create a new task
- **PUT** `/tasks/editTask` - Edit an existing task
- **PUT** `/tasks/editTaskStatus` - Update the status of a task
- **DELETE** `/tasks/deleteTask` - Delete a task

**Categories**

- **GET** `/categories` - Get all categories
- **GET** `/categories/userCategories` - Get categories associated with a user
- **GET** `/categories/category` - Get the name of a category using her id
- **POST** `/categories/createCategory` - Create a new category
- **PUT** `/categories/editCategory` - Edit an existing category
- **DELETE** `/categories/deleteCategory` - Delete a category

### Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes.

## Credits

This project is currently maintained and developed by Beatriz Avila (Sofware Engineer and Jr. Developer).

Feel free to contact me for any questions or suggestions!

|                                                         Contributor                                                          |
| :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/116601645?v=4" width=115><br>[beatrizheav](https://github.com/beatrizheav) |
