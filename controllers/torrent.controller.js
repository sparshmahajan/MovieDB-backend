require("dotenv").config();
const axios = require('axios');

const torrent = async (req, res) => {
    let id = req.params.id;
    let url = `https://yts.torrentbay.to/api/v2/list_movies.json?query_term=${id}`;
    let response = await axios.get(url);
    let data = response.data.data.movies;
    let torrents = data[0].torrents;
    let torrents_array = [];
    for (let i = 0; i < torrents.length; i++) {
        let torrent_obj = {
            url: torrents[i].url,
            quality: torrents[i].quality,
            seeds: torrents[i].seeds,
            peers: torrents[i].peers,
            size: torrents[i].size
        }
        torrents_array.push(torrent_obj);
    }
    res.json(torrents_array);
}

module.exports = { torrent }