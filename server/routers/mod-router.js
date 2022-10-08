const { Router } = require('express')

const {
    deleteReview,
    changeLevel,
    closeReport,
    getReports,
    strikeUser,
    getReport
} = require('../controllers/mod-controller')

const router = Router()

router.route('/delete').post(deleteReview)
router.route('/reports').get(getReports)
router.route('/close').post(closeReport)
router.route('/strike').post(strikeUser)
router.route('/level').post(changeLevel)
router.route('/:id').get(getReport)

module.exports = router