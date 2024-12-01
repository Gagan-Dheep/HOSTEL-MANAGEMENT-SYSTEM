const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, (req, res) => {
    res.sendFile('C:/Users/GAGAN/OneDrive/Desktop/Internship-Hostel-Management/static/warden.html')
})

module.exports = router;