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
        color: {
            type: String,
            enum: ['red', 'blue', 'yellow', 'orange', 'green', 'purple', 'pink', null]
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'Collection'
        }
    }
));