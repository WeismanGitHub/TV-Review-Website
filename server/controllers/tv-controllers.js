const NodeCache = require( "node-cache");
const axios = require('axios');
require("dotenv").config()

const trendingTVCache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

const searchTV = async (req, res) => {
    const results = (await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${req.query.page || 1}&include_adult=true&query=${req.query.phrase}`)).data.results
    .filter(result => result.media_type == 'tv' || result.media_type == 'movie')
    .map(result => {
        return {
            title: result.original_name || result.original_title || result.name,
            id: result.id,
            mediaType: result.media_type
        }
    })

    res.status(200).json(results)
}

const getTV = async (req, res) => {
    const type = req.params.type == 'movie' ? 'movie' : 'tv'
    
    const result = (await axios.get(`https://api.themoviedb.org/3/${type}/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)).data

    let tv = {
        title: result.original_name || result.original_title || result.name,
        genres: result.genres.map(genre => genre.name).join(', '),
        release: type == 'movie' ? result.release_date : result.first_air_date,
        overview: result.overview,
    }

    if (type == 'tv') {
        tv = {
            ...tv,
            episodeCount: result.number_of_episodes,
            seasons: result.seasons.map(season => {
                return {
                    episodeCount: season.episode_count,
                    airDate: season.air_date,
                    name: season.name,
                }
            }),
        }
    }

    res.status(200).json(tv)
}

const getTrendingTV = async (req, res) => {
    let trendingTV = trendingTVCache.get('trendingTV')

    if (!trendingTV) {
        const trendingMovies = (await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`)).data.results
        const trendingShows = (await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`)).data.results
        
        trendingTV = trendingMovies.concat(trendingShows).sort(() => Math.random() - 0.5)
        .map(tv => {
            return {
                title: tv.original_name || tv.original_title || tv.name,
                mediaType: tv.media_type,
                id: tv.id,
            }
        })

        trendingTVCache.set('trendingTV', trendingTV)
    }
    
    res.status(200).json(trendingTV)
}

module.exports = {
    getTrendingTV,
    searchTV,
    getTV,
}