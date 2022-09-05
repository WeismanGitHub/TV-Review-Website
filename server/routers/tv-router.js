const { getTVList } = require('../controllers/tv-controllers')
const express = require('express')

const router = express.Router()

router.route('/').post(getTVList)

module.exports = router