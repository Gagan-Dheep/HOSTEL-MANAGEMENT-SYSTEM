const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const att = req.body; // Single attendance object: { studentId, status }
    console.log("Received attendance object:", att);

    // Get the current date in YYYY-MM-DD format
    const date = new Date().toISOString().split('T')[0];
    console.log("Formatted Date:", date);

    try {
        const db = await connectToMongoDB();

        const requestsCollection = db.collection('attendence_request');
        const recordsCollection = db.collection('attendance_records');

        // Log query condition
        const query = { student_id: att.studentId, date: date, status: "Pending" };
        console.log("Query Condition:", query);

        // Update the request status in attendance_request
        const result = await requestsCollection.updateOne(
            query, // Match condition
            { $set: { status: att.status } } // Update status
        );

        // Log result
        console.log("Update Result:", result);

        // Check if any document was matched and modified
        if (result.matchedCount === 0) {
            return res.status(404).send('No matching attendance request found.');
        }

        // Insert into attendance_records
        await recordsCollection.insertOne({
            student_id: att.studentId,
            date: date,
            status: att.status,
            marked_by: 'Warden',
        });

        res.status(200).send('Attendance marked successfully.');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Error marking attendance.');
    }
});

module.exports = router;
