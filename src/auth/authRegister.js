const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database')


router.post('/', async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log(req.body);
    
    const couponapproval = 0;
    if (!username || !email) {
        return res.status(500).json({ status: "error", error: "fill the username or email" })
    }
    else {
        
        try {
            const db = await connectToMongoDB();
            const loginCollection = db.collection('login'); 

            // Check if username or email already exists
            const existingUser = await loginCollection.findOne({ 
                $or: [ { username: username }, { email: email } ] 
            });

            if (existingUser) {
                return res.status(500).json({ status: "error", error: "Username or email already exists" });
            }

            // Check if a WARDEN already exists
            if (role === 'WARDEN') {
                const existingWarden = await loginCollection.findOne({ role: 'WARDEN' });
                if (existingWarden) {
                    return res.status(500).json({ status: "error", error: "A WARDEN is already present" });
                }
            }

            // Insert the new user
            const newUser = {
                username: username,
                email: email,
                password: password,
                role: role,
                couponapproval: couponapproval
            };
            const result = await loginCollection.insertOne(newUser);
            console.log(result);
            
            return res.status(201).json({ status: "success", success: "User is registered" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ status: "error", error: "Server error" });
        }
    }
})

module.exports = router;