
# To-Do App Backend
This repository contains the backend API for the To-Do List app. The backend serves as the core service to manage tasks, user authentication, and other app-related functionalities. It provides a RESTful API for interacting with the app's front end.
___

## Features
- **Task Management**: Create, update, delete, and retrieve tasks.
- **User Authentication**: Secure user login and registration.
- **Data Persistence**: Tasks and user data are stored in a database.
- **Basic Controllers**: Sample controllers for basic testing and setup.
___

## Project Structure
The backend project is organized as follows:
- `controllers/` # Contains controller files for routing logic
- `config/`    # Configuration files (e.g., database, environment settings)
  - `db.js`   # Database connection setup
- `server.js`    # Entry point for the backend server
- `.gitignore`  # Git ignore file (excludes node_modules, .env files, etc.)
- `CODEOWNERS`  # Defines code ownership for pull requests

## Installation
**Prerequisites**
- Node.js (v14 or above)
- npm or yarn

## Steps to Set Up the Backend
1. Clone the repository:
git clone [https://github.com/yourusername/todo-backend.git](https://github.com/beatrizheav/ToDoApp_Backend.git)
cd ToDoApp_Backend.git

2. Install the dependencies:
npm install

3. Set up environment variables by creating a .env file in the root directory. Example variables:
DB_HOST= your host
DB_USER= your user
DB_PASSWORD= your password
DB_NAME= your db name

4. Start the backend server
npm run dev

## API Endpoints
in process...
