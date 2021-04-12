const express = require('express');
const router = express.Router();
const db = require('../models');
const verifyToken = require('./authentication');

router.post('/', verifyToken, (req, res) => {
    db.bookmark.findOne({ 
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
        parent: req.body.parent
    }).then( found => {
        if (found) {
            res.status(500).json({ message: 'Duplicate bookmark' })
            return
        }

        db.bookmark.create({
            name: req.body.name,
            url: req.body.url,
            notes: req.body.notes,
            color: req.body.color,
            user: req.userId,
            parent: req.body.parent || req.root
        }).then( (bookmark) => {
    
            const parent = req.body.parent || req.root;
            
            db.collection.findByIdAndUpdate(
                parent,
                { $addToSet: { bookmarks: bookmark.id } },
                { new: true }
            ).then( (collection) => {
                res.json(bookmark);
            }).catch( (err) => {
                res.status(500).json(err);
            });
    
        }).catch( (err) => {
            res.status(500).json(err);
        });
    }).catch( err => {
        res.status(500).json(err)
    })
});

// Rename a bookmark
router.put('/rename/', verifyToken, (req, res) => {
    db.bookmark.findOne({
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
        parent: req.body.parent
    }).then( found => {
        if (found) {
            res.status(500).json({ message: 'Duplicate bookmark' })
            return
        }
        
        db.bookmark.findByIdAndUpdate(
            req.body.id, 
            { $set: { name: req.body.name } }, 
            { new: true }
        ).then( (bookmark) => {
            res.json(bookmark)
        }).catch( (err) => {
            res.status(500).json(err)
        });
    }).catch( err => {
        res.status(500).json(err)
    })
});

router.put('/recolor', verifyToken, (req, res) => {
    db.bookmark.findByIdAndUpdate(
        req.body.id,
        { $set: { color: req.body.color } },
        { new: true }
    ).then((bookmark) => {
        res.json(bookmark)
    }).catch((err) => {
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
        });
    }

    else if (req.query.tags) {

        db.bookmark.find({ tags: {$all: req.query.tags.split(',')} }).then( (bookmarks) => {
            res.json(bookmarks);
        }).catch( (err) => {
            res.status(500).json(err)
        })
    }
});

module.exports = router;