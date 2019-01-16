const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = function (req, res, next) {
    const token = req.headers[config.tokenName];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        // verify that the username exists
        const isAvailable = config.users.find(u => {
            return u.username == decoded.id;
        });
        if(!isAvailable){
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        return next();
    });
  }




