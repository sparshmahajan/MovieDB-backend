const axios = require('axios');
const _ = require("lodash");

const search = async function (req, res) {
    const query = _.toLower(req.body.name);
    const response = await axios.get("https://api.themoviedb.org/3/search/multi?api_key=" + process.env.TMDB_API_KEY + "&query=" + query);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};


const search_movie_by_id = async function (req, res) {
    const id = req.params.id;
    const response = await axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};


const search_tv_by_id = async function (req, res) {
    const id = req.params.id;
    const response = await axios.get("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const trendig_movie = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const trendig_tv = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

module.exports = { search, search_movie_by_id, search_tv_by_id, trendig_movie, trendig_tv };