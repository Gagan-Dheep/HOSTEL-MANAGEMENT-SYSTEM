const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        // Connect to MongoDB
        const db = await connectToMongoDB();
        const applicationCollection = db.collection('application'); // Access 'application' collection

        // Fetch all applications
        const applications = await applicationCollection.find({}).toArray(); // Fetch all documents

        // Return the applications in the response
        res.json(applications);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", error: "An error occurred while retrieving applications" });
    }
});

module.exports = router;
