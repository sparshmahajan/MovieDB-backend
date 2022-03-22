require('dotenv').config();
const mongoose = require('mongoose');
const movieSchema = require('./movieSchema');

const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/userDB";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to db.");
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    movie: {
        type: [movieSchema],
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model("User", userSchema);

module.exports = User;