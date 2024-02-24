const user = require('../models/user');
const bcrypt=require('bcrypt');
const { body, validationResult } = require('express-validator');
const Createuser = async (req, res) => {
    try {
        const { name, password, email, location } = req.body;
        // Define validation rules
        await Promise.all([
            body('email').isEmail().run(req),
            body('password').isLength({ min: 5 }).withMessage('Incorrect password').run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                success: false,
                message: "Validation error"
            });
        }
        let hashedpassword;
        try{
            hashedpassword=await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"error in hashing"
            })
        }
        await user.create({
            name,
            password:hashedpassword,
            email,
            location
        });
        res.status(200).json({
            success: true,
            message: "User successfully created",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
module.exports = Createuser;
