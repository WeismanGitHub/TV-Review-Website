const axios = require('axios');
require("dotenv").config()

const searchTV = async (req, res) => {
    const results = (await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${req.query.page || 1}&include_adult=true&query=${req.params.phrase}`)).data.results
    .filter(
        result => result.media_type == 'tv' || result.media_type == 'movie'
    ).map(
        result => { return {
        title: result.original_name || result.original_title || result.name,
        id: result.id,
        media_type: result.media_type
    } })

    res.status(200)
    .json(results)
}

const getTV = async (req, res) => {
}

module.exports = {
    searchTV,
    getTV,
}