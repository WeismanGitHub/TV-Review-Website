const { getMovie, getShow, searchTV } = require('../controllers/tv-controllers')
const express = require('express')

const router = express.Router()

router.route('/show/:id').get(getShow)
router.route('/movie/:id').get(getMovie)
router.route('/search/:phrase').get(searchTV)

module.exports = router