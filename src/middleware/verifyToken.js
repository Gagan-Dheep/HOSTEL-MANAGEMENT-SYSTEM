const jwt = require('jsonwebtoken')  

function verifyToken(req, res, next) { 
    let token = req.cookies.refreshToken;
    // console.log(token);
    jwt.verify(token, "gagan", (err, data) => {
      if (!err) {
        next(); 
      } 
      else {
        return res.status(401).send({message: "Invalid Token"});
  
      }
    })
  }

  module.exports = verifyToken;