const express = require('express');
const app = express();
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, (req, res) => {
    res.cookie('refreshToken', '', { expires: new Date(0) });
    return res.status(200).json({status: 'success', success: "logout succes"});
})

module.exports = router;

