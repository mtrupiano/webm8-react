const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(require('./controllers/userController'));
app.use('/api/bookmarks', require('./controllers/bookmarkController'));
app.use('/api/collection', require('./controllers/collectionController'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/webm8_db", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});