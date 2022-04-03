require("dotenv").config();
const axios = require('axios');

const torrent = async (req, res) => {
    let { showId } = req.params.id;
    let url = `https://yts.torrentbay.to/api/v2/list_movies.json?query_term=${showId}`;
    let response = await axios.get(url);
    let torrents = response.data;
    res.send(torrents);
}

module.exports = { torrent }