const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Collection", new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Collection name required.'
        },
        color: {
            type: String,
            enum: ['red', 'blue', 'yellow', 'orange', 'green', 'purple', 'pink', null]
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        collections: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Collection'
            }
        ],
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'Collection'
        },
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Bookmark'
            }
        ]
    }
));