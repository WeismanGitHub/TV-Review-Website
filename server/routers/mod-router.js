const { Router } = require('express')

const {
    changeReportStatus,
    changeUserStrikes,
    getReportData,
    deleteReview,
    getReports,
} = require('../controllers/mod-controller')

const router = Router()

router.route('/delete').post(deleteReview)
router.route('/reports').get(getReports)
router.route('/status').post(changeReportStatus)
router.route('/strike').post(changeUserStrikes)
router.route('/report/:id').get(getReportData)

module.exports = router