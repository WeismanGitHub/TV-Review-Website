const { login, register, logout} = require('../controllers/authentication-controllers')
const { Router } = require('express')

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)

module.exports = router