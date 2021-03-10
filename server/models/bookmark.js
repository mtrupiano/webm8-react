const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Bookmark", new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Bookmark name required.'
        },
        url: {
            type: String,
            trim: true,
            required: 'URL required'
        }, 
        notes: {
            type: String,
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        tags: [{
            type: String,
            trim: true
        }]
    }
));