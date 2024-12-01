const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch'); 

router.post('/', verifyToken, async (req, res) => { 
    
    const { studentId } = req.body;
    const role = localStorage.getItem('role')
    const date = new Date().toISOString().split('T')[0]; // Current date
    if (role === "STUDENT") {  
        try {
            
            const db = await connectToMongoDB();
            const applicationCollection = db.collection('attendence_request'); 
            const existingRequest = await applicationCollection.findOne({ student_id: studentId, date });
            console.log(existingRequest);
            
            if (existingRequest) {
                return res.status(400).send('Attendance request already exists for today.');
            }
            await applicationCollection.insertOne({
                student_id: studentId,
                date: date,
                status: 'Pending'
            });
            res.status(201).send('Attendance request submitted.');
        } catch (error) {
            res.status(500).send('Error submitting request.');
        }
    }
})

module.exports = router;