const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: 'Username required.',
            validate: [ u => u.length >= 3 || u.length <= 20, "Username must be between 3 and 20 characters" ]
        },
        name: {
            type: String,
            trim: true,
            required: 'Name required'
        },
        email: {
            type: String,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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

