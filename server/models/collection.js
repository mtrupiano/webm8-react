const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Collection", new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: 'Bookmark name required.'
        },
        color: {
            type: String,
            enum: ['red', 'blue', 'yellow', 'orange', 'green', 'purple', 'pink']
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
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Bookmark'
            }
        ],
        tags: [
            {
                type: String,
                unique: true,
                trim: true
            }
        ]
    }
));