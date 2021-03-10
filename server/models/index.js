
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose

db.user = require('./user.js');
db.bookmark = require('./bookmark');
db.collection = require('./collection');

module.exports = db;
