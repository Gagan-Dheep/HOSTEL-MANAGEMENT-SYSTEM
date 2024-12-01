const { Parser } = require('json2csv');
const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const studentsCollection = db.collection('attendance_records'); // Assume students are in a 'students' collection.

        const students = await studentsCollection.find().toArray();
        // console.log(students);
        
        if (!students.length) {
            return res.status(404).send('No students found.');
        }

        res.json(students); // Send the student details as JSON.
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error fetching student details.');
    }
});

module.exports = router;

