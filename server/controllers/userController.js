const express   = require('express');
const router    = express.Router();
const db        = require('../models');
const bcrypt    = require("bcrypt");
const jwt = require('jsonwebtoken');

const verifyToken = require('./authentication');
const config = require('../config/auth');

router.post('/register', (req, res) => {
    db.user.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        hash_password: bcrypt.hashSync(req.body.password, 8)
    }).then( (user) => {
        db.collection.create({
            name: '_root',
            user: user._id
        }).then( (collection) => {
            res.json(user);
        }).catch( (err) => {
            res.status(500).json(err);
        })
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

router.post('/signin', async (req, res) => {

    const user = await db.user.findOne({
        username: req.body.username
    });

    const rootCollection = await db.collection.findOne({
        name: '_root',
        user: user.id
    });

    console.log(rootCollection);

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    if (!bcrypt.compareSync(req.body.password, user.hash_password)) {
        return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, root: rootCollection.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ ...(user._doc), accessToken: token });

});

module.exports = router;