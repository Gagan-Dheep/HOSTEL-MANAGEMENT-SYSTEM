const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const applicationCollection = db.collection('application'); 

        const applications = await applicationCollection.find({}).toArray(); 

        res.json(applications);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", error: "An error occurred while retrieving applications" });
    }
});

module.exports = router;
