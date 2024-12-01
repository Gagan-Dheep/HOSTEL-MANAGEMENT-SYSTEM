const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const usn = req.body.student;

    if (!usn) {
        console.log("Enter the USN");
        return res.status(400).json({ status: "error", error: "USN is required" });
    }

    try {
        const db = await connectToMongoDB();
        const loginCollection = db.collection('login');

        const user = await loginCollection.findOne({ email: usn });

        if (!user) {
            return res.status(500).json({ status: "error", error: "User not found" });
        }

        const approvalStatus = user.couponapproval;

        if (!approvalStatus || approvalStatus === 'decline') {
            const newState = 'approve';

            await loginCollection.updateOne(
                { username: usn },
                { $set: { couponapproval: newState } }
            );

            return res.status(201).json({ status: "success", success: "Coupon approved" });
        } else {
            return res.status(200).json({ status: "error", error: "User already has a coupon" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", error: "An error occurred" });
    }
});

module.exports = router;
