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

    res.status(200).json(results)
}

const getTV = async (req, res) => {
    const tvType = req.params.tvType == 'movie' ? 'movie' : 'tv'
    let result = (await axios.get(`https://api.themoviedb.org/3/${tvType}/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)).data

    if (tvType == 'movie') {
        result = {
            title: result.original_name || result.original_title || result.name,
            genres: result.genres.map(genre => genre.name).join(', '),
            release: result.release_date,
            overview: result.overview,
        }
    } else {
        result = {
            title: result.original_name || result.original_title || result.name,
            genres: result.genres.map(genre => genre.name).join(', '),
            episodeCount: result.number_of_episodes,
            release: result.first_air_date,
            overview: result.overview,
            seasons: result.seasons.map(season => {
                return {
                    episodeCount: season.episode_count,
                    airDate: season.air_date,
                    name: season.name,
                }
            }),
        }
    }

    res.status(200).json(result)
}

module.exports = {
    searchTV,
    getTV,
}