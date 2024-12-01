const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const { studentId } = req.body;
    
    const date = new Date().toISOString().split('T')[0]; // Current date

    try {
        const db = await connectToMongoDB();
        const applicationCollection = db.collection('attendence_request');

        // Check if the request exists
        const existingRequest = await applicationCollection.findOne({ student_id: studentId, date });

        if (existingRequest) {
            return res.status(200).json({ alreadyRequested: true });
        } else {
            return res.status(200).json({ alreadyRequested: false });
        }
    } catch (error) {
        console.error("Error checking request status:", error);
        res.status(500).send('Error checking request status.');
    }
});


module.exports = router;