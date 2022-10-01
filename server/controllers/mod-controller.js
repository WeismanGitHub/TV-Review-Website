const ReportModel = require('../models/report-model')
const UserModel = require('../models/user-model')

const deleteReview = async (req, res) => {
    await ReviewModel.deleteOne({ _id: req.body.reviewId })

    res.status(200).end()
}

const getReports = async (req, res) => {
    const reports = await ReportModel.find({ resolved: req.query.status})
    .skip((req.query.page || 1) * 10).limit(10).select('-__v').lean()

    res.status(200).json(reports)
}

const strikeUser = async (req, res) => {
    await UserModel.updateOne(
        { _id: req.body.reportId },
        { $inc : { 'strikes' : 1 } }
    )
}

const closeReport = async (req, res) => {
    await ReportModel.updateOne(
        { _id: req.body.reportId },
        { resolved: true }
    )

    res.status(200).end()
}

const changeLevel = async (req, res) => {
    const user = await UserModel.findById(req.body.userId).select('level').lean()

    if (req.user.level == 'administrator' && user.level == 'user') {
        user.level = 'administrator'
        await user.save()
    }

    res.status(200).end()
}

module.exports = {
    deleteReview,
    changeLevel,
    closeReport,
    getReports,
    strikeUser,
}