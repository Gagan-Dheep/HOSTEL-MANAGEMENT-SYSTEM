const { Parser } = require('json2csv');
const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {

    try {
        const db = await connectToMongoDB();

        const recordsCollection = db.collection('attendance_records');

        const records = await recordsCollection.find({}).toArray();
        console.log(records);
        
        const fields = ['student_id', 'date', 'status', 'marked_by'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(records);

        res.header('Content-Type', 'text/csv');
        res.attachment('attendance.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).send('Error generating CSV file.'); 
    } 
});

module.exports = router;
