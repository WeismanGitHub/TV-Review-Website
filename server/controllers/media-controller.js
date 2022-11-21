const { BadRequestError } = require('../errors')
const NodeCache = require( "node-cache");
const axios = require('axios');

const trendingMediaCache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

function standardizeMedia(media) {
    return media.map(result => {
        return {
            title: result.original_name || result.original_title || result.name,
            id: result.id,
            mediaType: result.media_type
        }
    })
}

const searchMedia = async (req, res) => {
    let { page, phrase } = req.query

    if (!page) {
        page = 0
    }

    if (isNaN(page) || page < 0) {
        throw new BadRequestError('Invalid page number.')
    }

    if (!phrase.length) {
        throw new BadRequestError('Invalid search phrase.')
    }
    
    const results = standardizeMedia((await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page || 1}&include_adult=true&query=${phrase}`)).data.results
    .filter(result => result.media_type == 'tv' || result.media_type == 'movie'))

    res.status(200).json(results)
}

const getMedia = async (req, res) => {
    const { type, id } = req.params
    
    const result = (await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)).data

    let media = {
        title: result.original_name || result.original_title || result.name,
        genres: result.genres.map(genre => genre.name).join(', '),
        release: type == 'movie' ? result.release_date : result.first_air_date,
        overview: result.overview,
    }

    if (type == 'tv') {
        media = {
            ...media,
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

    res.status(200).json(media)
}

const getTrendingMedia = async (req, res) => {
    let trendingMedia = trendingMediaCache.get('trendingMedia')

    if (!trendingMedia) {
        const trendingMovies =(await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`)).data.results
        const trendingTV = (await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`))
        .data.results

        trendingMedia = { movies: standardizeMedia(trendingMovies), tv: standardizeMedia(trendingTV) }

        trendingMediaCache.set('trendingMedia', trendingMedia)
    }
    
    res.status(200).json(trendingMedia)
}

module.exports = {
    getTrendingMedia,
    searchMedia,
    getMedia,
}