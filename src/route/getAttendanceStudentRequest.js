const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    const date = new Date().toISOString().split('T')[0]; // Current date

    try {
        const db = await connectToMongoDB();
        const applicationCollection = db.collection('attendence_request'); 

        const requests = await applicationCollection.find({ date: date, status: 'Pending' }).toArray();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).send('Error fetching attendance requests.');
    } 
});

module.exports = router;