const { getTV, searchTV, getTrendingTV} = require('../controllers/tv-controllers')
const { Router } = require('express')

const router = Router()

router.route('/search/:phrase').get(searchTV)
router.route('/trending').get(getTrendingTV)
router.route('/:type/:id').get(getTV)

module.exports = router