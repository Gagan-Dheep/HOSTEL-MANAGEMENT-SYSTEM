const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const { name, usn, fromDate, tillDate, peri, number, description } = req.body;

    // Validate required fields
    if (!name || !usn || !fromDate || !tillDate || !peri || !description) {
        return res.status(500).json({ status: "error", error: "Fill the required fields" });
    }

    try {
        // Connect to MongoDB
        const db = await connectToMongoDB();
        const applicationCollection = db.collection('application'); 

        const existingApplications = await applicationCollection.find({ $or: [{ name: name }, { usn: usn }] }).toArray();

        if (existingApplications.length >= 3) {
            return res.status(500).json({ status: "error", error: "Maximum number of applications reached" });
        }

        const newApplication = {
            name: name,
            usn: usn,
            datestart: fromDate,
            dateend: tillDate,
            timeperiod: peri,
            totalleave: number,
            description: description
        };

        await applicationCollection.insertOne(newApplication);

        return res.status(201).json({ status: "success", success: "Successfully Applied" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", error: "An error occurred while applying" });
    }
});

module.exports = router;
