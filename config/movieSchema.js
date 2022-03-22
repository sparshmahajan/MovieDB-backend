const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movie_id: String,
    type: String
});

module.exports = movieSchema;