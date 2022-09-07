const { getTV, searchTV } = require('../controllers/tv-controllers')
const express = require('express')

const router = express.Router()

router.route('/search/:phrase').get(searchTV)
router.route('/:tvType/:id').get(getTV)

module.exports = router