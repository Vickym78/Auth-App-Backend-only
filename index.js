const cookieParser = require("cookie-parser");
const express = require("express");
const PORT = 3001;
const app = express();

// Connecting database
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/my_doc");
let db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to database");
});

// Connecting with routes
app.use(express.json()); // for json values
app.use(cookieParser)
require('./routes/user.route')(app); // Passing the app instance to user routes

// Connecting to server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

