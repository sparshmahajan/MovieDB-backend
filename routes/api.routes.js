const express = require("express");
const router = express.Router();
const { search, search_movie_by_id, search_tv_by_id, trendig_movie, trendig_tv } = require('../controllers/api.controller')

router.get('/search', search);
router.get('/search_movie/:id', search_movie_by_id);
router.get('/search_tv/:id', search_tv_by_id);
router.get('/trending_movie', trendig_movie);
router.get('/trending_tv', trendig_tv);

module.exports = router;
