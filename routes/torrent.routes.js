const express = require("express");
const router = express.Router();
const { torrent } = require('../controllers/torrent.controller')

router.get('/torrent/:id', torrent);

module.exports = router;