const { Router } = require('express')

const {
    deleteReview,
    changeLevel,
    closeReport,
    getReports,
    strikeUser,
} = require('../controllers/mod-controller')

const router = Router()

router.route('/delete').post(deleteReview)
router.route('/reports').post(getReports)
router.route('/close').post(closeReport)
router.route('/strike').post(strikeUser)
router.route('/level').post(changeLevel)

module.exports = router