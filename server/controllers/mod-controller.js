const UserModel = require('../models/user-model')
const ReportModel = require('../models/report-model')

const deleteReview = async (req, res) => {
    await ReviewModel.deleteOne({ _id: req.body.reviewId })

    res.status(200).end()
}

const getReports = async (req, res) => {
    const reports = await ReportModel.find({ resolved: req.query.status})
    .skip(req.query.page * 10).limit(10)

    res.status(200).json(reports)
}

const strikeUser = async (req, res) => {

}

module.exports = {
    deleteReview,
    getReports,
    strikeUser
}