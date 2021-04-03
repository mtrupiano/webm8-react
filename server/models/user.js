const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: 'Bookmark name required.'
        },
        name: {
            type: String,
            trim: true,
            required: 'URL required'
        },
        email: {
            type: String,
            trim: true
        },
        hash_password: {
            type: String
        },
        created: {
            type: Date,
            default: Date.now
        },
        selectedBookmark: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookmark'
        },
        selectedCollection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        }
    }
);

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.hash_password);
}

module.exports = mongoose.model('User', UserSchema);

