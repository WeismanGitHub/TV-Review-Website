const { Router } = require('express')

const {
    changeReportStatus,
    getReportData,
    deleteReview,
    changeLevel,
    getReports,
    strikeUser,
} = require('../controllers/mod-controllers')

const router = Router()

router.route('/delete').post(deleteReview)
router.route('/reports').get(getReports)
router.route('/status').post(changeReportStatus)
router.route('/strike').post(strikeUser)
router.route('/level').post(changeLevel)
router.route('/report/:id').get(getReportData)

module.exports = router