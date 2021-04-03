const express   = require('express');
const router    = express.Router();
const db        = require('../models');
const bcrypt    = require("bcrypt");
const jwt = require('jsonwebtoken');

const verifyToken = require('./authentication');
const config = require('../config/auth');

router.get('/authenticate', (req, res) => {
    const token = req.headers['x-access-token'];

    jwt.verify(token, config.secret, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'You are not authorized to view this page.'});
        } else {
            res.json({data: data, token: token});
        }
    })
})

router.post('/register', (req, res) => {
    db.user.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        hash_password: bcrypt.hashSync(req.body.password, 8)
    }).then( (user) => {
        console.log(user)
        db.collection.create({
            name: '_root',
            user: user._id
        }).then( (collection) => {
            console.log(collection)
            db.user.findByIdAndUpdate(
                user._id,
                { $set: { selectedCollection: collection._id } },
                { new: true }
            ).then( (userComplete) => {
                res.json(userComplete);
            }).catch( (err) => {
                res.status(500).json(err);
            })
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
    
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    
    if (!bcrypt.compareSync(req.body.password, user.hash_password)) {
        return res.status(401).send({ message: 'Invalid password' });
    }
    
    const rootCollection = await db.collection.findOne({
        name: '_root',
        user: user._id
    });

    const token = jwt.sign({ 
                        id: user._id, 
                        root: rootCollection._id
                    }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });

    res.status(200).send({ ...(user._doc), accessToken: token });

});

router.put('/selectedCollection/:collectionId', verifyToken, (req, res) => {
    db.user.findOneAndUpdate(
        req.userId,
        { $set: { selectedCollection: req.params.collectionId }},
        { new: true }
    ).then( (user) => {
        res.json(user);
    }).catch( (err) => {
        res.status(500).json(err);
    })
})

router.get('/selectedCollection', verifyToken, (req, res) => {
    db.user.findById(req.userId).then( (result) => {
        res.json(result.selectedCollection);
    }).catch( (err) => {
        res.status(500).json(err);
    })
})

module.exports = router;