const express = require('express');
const router = express.Router();
const db = require('../models');
const verifyToken = require('./authentication');

router.post('/', verifyToken, (req, res) => {
    db.bookmark.create({
        name: req.body.name,
        url: req.body.url,
        notes: req.body.notes,
        tags: req.body.tags,
        user: req.userId
    }).then( (bookmark) => {
        res.json(bookmark);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// Rename a bookmark
router.put('/rename/:newName', verifyToken, (req, res) => {
    db.bookmark.findByIdAndUpdate(
        req.body.id, 
        { $set: { name: req.params.newName } }, 
        { new: true }
    ).then( (bookmark) => {
        res.json(bookmark)
    }).catch( (err) => {
        res.status(500).json(err);
    });
});


router.get('/', verifyToken, (req, res) => {

    // Get all bookmarks in a collection
    if (req.query.collection) {
        db.collection.findById(req.query.collection).populate('bookmarks').then( (collection) => {
            res.json(collection.bookmarks);
        }).catch( (err) => {
            res.status(500).json(err);
        })
    }

    if (req.query.tags) {

        db.bookmark.find({ tags: {$all: req.query.tags.split(',')} }).then( (bookmarks) => {
            res.json(bookmarks);
        }).catch( (err) => {
            res.status(500).json(err)
        })
    }
});

module.exports = router;