const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movie_id: {
        type: String,
        unique: false
    },
    media_type: {
        type: String,
        unique: false
    },
});

module.exports = movieSchema;