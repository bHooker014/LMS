const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
       
        const jwtToken = req.header("token");//getting token form header
        if (!jwtToken) {
            return res.status(403).json('Not Authorized')
        };
        
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        //req.user payload can be used with our routes
        req.user = payload.user;
        
      
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json('Not Authorized')
    }
};