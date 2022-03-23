const express = require("express");
const router = express.Router();
const { search, search_movie_by_id, search_tv_by_id, trending_movie, trending_tv, popular_movie, popular_tv, latest_movie, latest_tv, top_rated_movie, top_rated_tv, upcoming_movie, on_the_air, recommendations_movies, recommendations_tv, similar_movies, similar_tv } = require('../controllers/api.controller')

router.get('/search/:name', search);
router.get('/search_movie/:id', search_movie_by_id);
router.get('/search_tv/:id', search_tv_by_id);
router.get('/trending_movie', trending_movie);
router.get('/trending_tv', trending_tv);
router.get('/popular_movie', popular_movie);
router.get('/popular_tv', popular_tv);
router.get('/latest_movie', latest_movie);
router.get('/latest_tv', latest_tv);
router.get('/top_rated_movie', top_rated_movie);
router.get('/top_rated_tv', top_rated_tv);
router.get('/upcoming_movie', upcoming_movie);
router.get('/on_the_air', on_the_air);
router.get('/recommended_movies/:id', recommendations_movies);
router.get('/recommended_tv/:id', recommendations_tv);
router.get('/similar_movies/:id', similar_movies);
router.get('/similar_tv/:id', similar_tv);


module.exports = router;
