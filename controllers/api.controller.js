const axios = require('axios');
const _ = require("lodash");

const url = process.env.BACKEND_URL;
const search = async function (req, res) {
    const query = _.toLower(req.params.name);
    const response = await axios.get(`${url}/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};


const search_movie_by_id = async function (req, res) {
    const id = req.params.id;
    const response = await axios.get(`${url}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};


const search_tv_by_id = async function (req, res) {
    const id = req.params.id;
    const response = await axios.get(`${url}/tv/${id}?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const trending_movie = async function (req, res) {
    const response = await axios.get(`${url}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const trending_tv = async function (req, res) {
    const response = await axios.get(`${url}/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const popular_movie = async function (req, res) {
    const response = await axios.get(`${url}/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const popular_tv = async function (req, res) {
    const response = await axios.get(`${url}/tv/popular?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const top_rated_movie = async function (req, res) {
    const response = await axios.get(`${url}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const top_rated_tv = async function (req, res) {
    const response = await axios.get(`${url}/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const latest_movie = async function (req, res) {
    const response = await axios.get(`${url}/movie/latest?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const latest_tv = async function (req, res) {
    const response = await axios.get(`${url}/tv/latest?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const upcoming_movie = async function (req, res) {
    const response = await axios.get(`${url}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`);
    try {
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const on_the_air = async function (req, res) {
    const response = await axios.get(`${url}/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}`);
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
        const response = await axios.get(`${url}/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const recommendations_tv = async function (req, res) {
    const id = req.params.id;
    try {
        const response = await axios.get(`${url}/tv/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const similar_tv = async function (req, res) {
    const id = req.params.id;
    try {
        const response = await axios.get(`${url}/tv/${id}/similar?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const similar_movies = async function (req, res) {
    const id = req.params.id;
    try {
        const response = await axios.get(`${url}/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data.results);
    } catch (error) {
        res.send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

module.exports = { search, search_movie_by_id, search_tv_by_id, trending_movie, trending_tv, popular_movie, popular_tv, top_rated_movie, top_rated_tv, latest_movie, latest_tv, upcoming_movie, on_the_air, recommendations_movies, recommendations_tv, similar_tv, similar_movies };