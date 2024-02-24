const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Entries are missing"
            });
        }
        const userFound = await user.findOne({ email });
        
        if (!userFound) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please sign up."
            });
        }

        // Compare passwords
        console.log(password);
        console.log(userFound.password);
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);
        // console.log(isPasswordMatch);
        if (isPasswordMatch) {
           
            return res.status(401).json({
                success: false,
                message: "Password does not match. Please try again."
            });
        }

        // Generate JWT token
        const payload = {
            email: userFound.email,
            id: userFound._id,
        };
        const token = jwt.sign(payload, process.env.JWT, {
            expiresIn: "2h"
        });

        // Set token in user document
        userFound.token = token;
        await userFound.save();

        // Send token in response
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token: token // Send token in response body
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred. Please try again later."
        });
    }
};

module.exports = logIn;
