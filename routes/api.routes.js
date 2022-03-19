const express = require("express");
const router = express.Router();
const { search, search_movie_by_id, search_tv_by_id, trending_movie, trending_tv, popular_movie, popular_tv, latest_movie, latest_tv, top_rated_movie, top_rated_tv, upcoming_movie, on_the_air } = require('../controllers/api.controller')

router.get('/search', search);
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

module.exports = router;
