const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const { ObjectId } = require('mongodb'); 
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const approve = 'decline';
    const id = req.body.id; 
    // console.log(id);
    
    try {
        // Connect to MongoDB
        const db = await connectToMongoDB();
        const applicationCollection = db.collection('application'); 

        const result = await applicationCollection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { approval: approve } } 
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ status: "error", error: "Application not found" });
        }

        return res.status(201).json({ status: "success", success: "Successfully Updated" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", error: "An error occurred while updating the application" });
    }
});

module.exports = router;
