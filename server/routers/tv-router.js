const { getTV, searchTV } = require('../controllers/tv-controllers')
const express = require('express')

const router = express.Router()

router.route('/search/:phrase').get(searchTV)
router.route('/:type/:id').get(getTV)

module.exports = router