const { getTrendingMedia, searchMedia, getMedia } = require('../controllers/tv-controllers')
const { Router } = require('express')

const router = Router()

router.route('/search').get(searchMedia)
router.route('/trending').get(getTrendingMedia)
router.route('/:type/:id').get(getMedia)

module.exports = router