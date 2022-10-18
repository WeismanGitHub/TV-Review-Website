const { Router } = require('express')

const {
    changeReportStatus,
    changeUserStrikes,
    getReportData,
    deleteReview,
    changeLevel,
    getReports,
} = require('../controllers/mod-controllers')

const router = Router()

router.route('/delete').post(deleteReview)
router.route('/reports').get(getReports)
router.route('/status').post(changeReportStatus)
router.route('/strike').post(changeUserStrikes)
router.route('/level').post(changeLevel)
router.route('/report/:id').get(getReportData)

module.exports = router