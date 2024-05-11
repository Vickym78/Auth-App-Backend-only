const express = require("express");
const database = require("../module/user.module");
const emailvalid = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = 'your_secret_key_here'


exports.signup = async (req, res) => {
    // 1. Creating column for DATABASE
    const { name, email, password, confirm_password } = req.body;
    console.log(name, email, password, confirm_password);
    
    // 5. checking for existing details
    if (!name || !email || !password || !confirm_password) {
        return res.status(400).send({
            message: "Error some values are missing"
        });
    }

    // 6. checking for valid mail id
    const emailcheck = emailvalid.validate(email);
    if (!emailcheck) {
        return res.status(400).send({
            message: "Invalid email"
        });
    }

    // 7. checking for password and confirm password
    if (password !== confirm_password) {
        return res.status(400).send({
            message: "Confirm password has different values"
        });
    }

    // 2. Checking if the email already exists
    try {
        const existingUser = await database.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists"
            });
        }

        // 3. Saving data to the database
        const newUser = new database(req.body);
        const result = await newUser.save();
        res.status(200).send({
            success: true,
            message: "Data is saved into database"
        });
    } catch (err) {
        res.status(400).send({
            message: "Error occurred",
            error: err
        });
    }
};


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({
                message: "Please provide email and password"
            });
        }

        // Find user by email
        const user = await database.findOne({ email: email }).select('+password');

        // Check if user exists
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        // Check if password is correct
       

        // Password is correct, generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            secretKey,
            { expiresIn: '24h' }
        );
        

        // Set token in cookies
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            secure: true 
        });
       
        res.status(200).send({
            status: "Login successful"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
};


exports.getuserinfo=(req,res)=>{
    const userid = req.user.id;

    try{

let user = database.findById(userid);
return res.send({
    success:true,
    data :user
})

    }
    catch(e){
return res.send(e.message)
    }

}