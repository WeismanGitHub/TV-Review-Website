const { Router } = require('express')

const {
    deleteReview,
    closeReport,
    getReports,
    strikeUser,
    changeLevel,
} = require('../controllers/authentication-controllers')

const router = Router()

router.route('/delete').post(deleteReview)
router.route('/reports').post(getReports)
router.route('/close').post(closeReport)
router.route('/strike').post(strikeUser)
router.route('/level').post(changeLevel)

module.exports = router