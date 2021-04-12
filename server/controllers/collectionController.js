const express = require('express');
const router = express.Router();
const db = require('../models');
const verifyToken = require('./authentication');

router.post('/', verifyToken, (req, res) => {
    if (req.body.name === '_root' || req.body.name === 'root') {
        res.status(500).json({ message: "Name reserved" })
        return
    }

    db.collection.findOne({ 
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
        parent: req.body.parent 
    }).then( found => {
        if (found) {
            res.status(500).json({ message: 'Duplicate collection' })
            return 
        }
        db.collection.create({
            name: req.body.name,
            user: req.userId,
            color: req.body.color,
            parent: req.body.parent || req.root
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
                console.log(req.root);
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
    }).catch( err => {
        res.status(500).json(err)
    })
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

router.put('/rename', verifyToken, (req, res) => {
    db.collection.findOne({
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
        parent: req.body.parent
    }).then( found => {
        if (found) {
            res.status(500).json({ message: 'Duplicate collection' })
            return
        }

        db.collection.findByIdAndUpdate(
            req.body.id,
            { $set: { name: req.body.name } },
            { new: true }
        ).then((collection) => {
            res.json(collection)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }).catch( err => {
        res.status(500).json(err)
    })
});

router.get('/', verifyToken, (req, res) => {
    // Get all of a collection's entities
    if (req.query.collection) {
        db.collection.findById(req.query.collection)
            .populate('collections').populate('bookmarks')
            .then( (collection) => {
                res.json(collection)
            })
            .catch( (err) => {
                res.status(500).json(err)
            });
    }
});

router.get('/path', verifyToken, async (req, res) => {
    let currentCollection = await db.collection.findById(req.query.collection);
    if (currentCollection.name === '_root') {
        res.json([ currentCollection ])
        return
    }
    
    let path = [];
    let parent = await db.collection.findById(currentCollection.parent, '_id name');
    while (parent.name !== '_root') {
        path.push(parent);
        currentCollection = await db.collection.findById(currentCollection.parent);
        parent = await db.collection.findById(currentCollection.parent, '_id name');
    }
    path.push(parent)

    res.json(path.reverse());
});

router.put('/recolor', verifyToken, (req, res) => {
    db.collection.findByIdAndUpdate(
        req.body.id,
        { $set: { color: req.body.color } },
        { new: true }
    ).then( (collection) => {
        res.json(collection);
    }).catch( (err) => {
        res.status(500).json(err);
    })
});


module.exports = router;