const { getTV, searchTV } = require('../controllers/tv-controllers')
const { Router } = require('express')

const router = Router()

router.route('/search/:phrase').get(searchTV)
router.route('/:type/:id').get(getTV)

module.exports = router