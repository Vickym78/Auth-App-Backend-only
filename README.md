# Authentication App - Backend

This repository contains the backend code for an authentication app built with Node.js, Express.js, and MongoDB.

## Features

- User registration and authentication
- Token-based authentication using JWT
- Secure password hashing using bcrypt
- MongoDB for storing user information

## Requirements

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)
- npm (comes with Node.js)

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/authentication-app-backend.git
    cd authentication-app-backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/authentication_app
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run the Application**

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:3000`.

## Usage

### Register a New User

- **Endpoint**: `POST /api/register`
- **Request Body**:

    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

### User Login

- **Endpoint**: `POST /api/login`
- **Request Body**:

    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

- **Response**:

    ```json
    {
      "token": "jwt_token"
    }
    ```

### Get User Profile

- **Endpoint**: `GET /api/profile`
- **Headers**:

    ```http
    Authorization: Bearer jwt_token
    ```

- **Response**:

    ```json
    {
      "id": "user_id",
      "email": "user@example.com"
    }
    ```

## Folder Structure

```bash
authentication-app-backend/
├── controllers/
│   └── authController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
