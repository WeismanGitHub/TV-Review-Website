const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const cors = require('cors')

require('express-async-errors')
require("dotenv").config()

const authenticationRouter = require('./routers/authentication-router')
const notFoundMiddleware = require('./middleware/not-found-middleware')
const modAuthMiddleware = require('./middleware/mod-auth-middleware')
const errorHandler = require('./middleware/error-handler')
const reviewRouter = require('./routers/review-router')
const userRouter = require('./routers/user-router')
const modRouter = require('./routers/mod-router')
const TVRouter = require('./routers/tv-router')

const app = express()
const limiter = rateLimit({
    windowMs: 500,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(limiter)
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(helmet.contentSecurityPolicy({ directives: { 'script-src-attr': null } }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(cors())

app.use('/api/authentication', authenticationRouter)
app.use('/api/mod', modAuthMiddleware, modRouter)
app.use('/api/review', reviewRouter)
app.use('/api/user', userRouter)
app.use('/api/tv', TVRouter)
app.use('/api', notFoundMiddleware)

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../client/build') })
})

app.use(errorHandler)

try {
    const port = process.env.PORT || 5000
    mongoose.connect(process.env.LOCAL_MONGO_URI, { autoIndex: true })
    console.log('Connected to database...')
    app.listen(port, console.log(`Listening on port ${port}...`))
} catch (err) {
    console.error(err)
}