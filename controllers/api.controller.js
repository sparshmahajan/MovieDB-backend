const axios = require('axios');
const _ = require("lodash");


const search = async function (req, res) {
    const query = _.toLower(req.params.name);
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

const trending_movie = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const trending_tv = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const popular_movie = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const popular_tv = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/tv/popular?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const top_rated_movie = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const top_rated_tv = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const latest_movie = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/movie/latest?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const latest_tv = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/tv/latest?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const upcoming_movie = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const on_the_air = async function (req, res) {
    const response = await axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key=" + process.env.TMDB_API_KEY);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const recommendations_movies = async function (req, res) {
    const id = req.params.id;
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/" + id + "/recommendations?api_key=" + process.env.TMDB_API_KEY);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const recommendations_tv = async function (req, res) {
    const id = req.params.id;
    try {
        const response = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/recommendations?api_key=" + process.env.TMDB_API_KEY);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const similar_tv = async function (req, res) {
    const id = req.params.id;
    try {
        const response = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/similar?api_key=" + process.env.TMDB_API_KEY);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const similar_movies = async function (req, res) {
    const id = req.params.id;
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=" + process.env.TMDB_API_KEY);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};





module.exports = { search, search_movie_by_id, search_tv_by_id, trending_movie, trending_tv, popular_movie, popular_tv, top_rated_movie, top_rated_tv, latest_movie, latest_tv, upcoming_movie, on_the_air, recommendations_movies, recommendations_tv, similar_tv, similar_movies };