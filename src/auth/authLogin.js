const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectToMongoDB = require('../database');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch'); 

router.post('/', async (req, res) => {
    const { email, password, role } = req.body; // Destructure request body for cleaner code

    if (!email) {
        return res.status(500).json({ status: "error", error: "Fill the email field" });
    }

    try {
        // Connect to MongoDB
        const db = await connectToMongoDB();
        const loginCollection = db.collection('login'); // Access 'login' collection
        
        // Check if a user with the given email exists
        const user = await loginCollection.findOne({ email: email });
        
        if (user) {
            if (password === user.password) {
                if (role === user.role) {
                  
                    const userRole = user.role === 'WARDEN' ? 'WARDEN' : 'STUDENT';
                    jwt.sign({ Useremail: email, UserRole: userRole }, 'gagan', (error, token) => {
                        if (!error) {
                            res.cookie("refreshToken", token, {
                                httpOnly: true,
                                maxAge: 24 * 60 * 60 * 1000, // 1 day
                                // secure: true,
                                // sameSite: 'None' 
                            });
                            
                            try{
                                localStorage.setItem("role", role)
                                localStorage.setItem("username", email)
                            }
                            catch(err){
                                console.log(err);
                                 
                            }

                            return res.status(201).json({ status: "success", success: "User logged in successfully", role: userRole });
                        } else {
                            return res.status(500).json({ message: "Some error occurred during token generation" });
                        }
                    });
                } else {
                    return res.status(500).json({ status: "error", error: "Wrong role chosen" });
                }
            } else {
                return res.status(500).json({ status: "error", error: "Incorrect password" });
            }
        } else {
            return res.status(500).json({ status: "error", error: "No user found with this email" }); 
        }
    } catch (error) {
        return res.status(500).json({ status: "error", error: "An error occurred during the login process" });
    }
});

module.exports = router;
