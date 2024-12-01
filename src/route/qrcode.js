const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../database');
const verifyToken = require('../middleware/verifyToken');
const QRCode = require('qrcode');
// const { ObjectId } = require('mongodb');

router.post('/', verifyToken, async (req, res) => {
    const username = req.body.student;
    console.log(req.body);
    
    try {
        const db = await connectToMongoDB();
        const loginCollection = db.collection('login');
        const user = await loginCollection.findOne({ email: username });
        
        if (!user) {
            return res.status(500).json({ status: "error", error: "The user with this username is not present" });
        }

        const timePeriodOfCoupon = user.couponapproval;
        // console.log(user.couponapproval);
        
        if (Date.now() > timePeriodOfCoupon) {
            QRCode.toDataURL(username, async (err, qrCodeUrl) => {
                if (err) {
                    console.error(err);
                    throw err;
                }

                const expirationTimestamp = Date.now() + 86400000;

                await loginCollection.updateOne(
                    { email: username },
                    { $set: { couponapproval: expirationTimestamp } }
                );

                return res.json({ qrCode: qrCodeUrl });
            });
        } else {
            return res.status(201).json({ status: "success", success: "The user with this username has an active coupon" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", error: "An error occurred" });
    }
});

module.exports = router;
