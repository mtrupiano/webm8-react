const express = require('express');
const router = express.Router();
const db = require('../models');
const verifyToken = require('./authentication');

router.post('/', verifyToken, (req, res) => {
    db.collection.create({
        name: req.body.name,
        user: req.userId,
        color: 'red'
    }).then( (collection) => {
        // If a parent collection is specified, update the parent
        if (req.body.parent) {
            db.collection.findByIdAndUpdate(
                req.body.parent,
                { $addToSet: { collections: collection.id } },
                { new: true } 
            ).populate('collections')
                .populate('bookmarks')
                .then( (updatedParent) => {
                    res.json(updatedParent);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } else {
            // Add new collection to user's root
            db.collection.findByIdAndUpdate(
                req.root,
                { $addToSet: { collections: collection.id } },
                { new: true }
            ).populate('collections')
                .populate('bookmarks')
                .then( (updatedRoot) => {
                    res.json(updatedRoot);
                })
                .catch( (err) => {
                    res.status(500).json(err);
                });
        }
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// Add a bookmark to this collection
router.put('/bookmark/:bookmarkId', verifyToken, (req, res) => {
    db.collection.findByIdAndUpdate(
        req.body.id,
        { $addToSet: { bookmarks: req.params.bookmarkId } },
        { new: true }
    ).then( (collection) => {
        res.json(collection);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

router.get('/', verifyToken, (req, res) => {
    // Get all of a collection's subcollections
    if (req.query.collection) {
        db.collection.findById(req.query.collection)
            .populate('collections').populate('bookmarks')
            .then( (collection) => {
                res.json(collection);
            })
            .catch( (err) => {
                res.status(500).json(err);
            });
    } else {
        // Get a user's root collection
        db.collection.find({ name: '_root',  user: req.userId })
            .populate('collections')
            .populate('bookmarks')
            .then( (collection) => {
                res.json(collection);
            })
            .catch( (err) => {
                res.status(500).json(err);
            });
    }
});


module.exports = router;