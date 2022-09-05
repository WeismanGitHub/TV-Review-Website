const { getTV, searchTV } = require('../controllers/tv-controllers')
const express = require('express')

const router = express.Router()

router.route('/:name').get(getTV)
router.route('/search/:phrase').get(searchTV)

module.exports = router