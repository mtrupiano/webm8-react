const jwt = require('jsonwebtoken');
const db = require('../models');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    console.log('Verifying token!');
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({message: 'No token provided.'})
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!'});
        }
        console.log("Token verified!")
        req.userId = decoded.id;
        req.root = decoded.root;
        next();
    });
};