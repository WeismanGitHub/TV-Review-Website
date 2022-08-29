const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

require('express-async-errors');
require("dotenv").config();

const authenticationMiddleware = require('./middleware/authentication-middleware')
const authenticationRouter = require('./routers/authentication-router')
const errorHandler = require('./middleware/error-handler')
const userRouter = require('./routers/user-router')

const app = express();
const limiter = rateLimit({
    windowMs: 500,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(limiter)
app.use(express.static(path.join(__dirname, '../', 'client', 'build')))
app.use(helmet.contentSecurityPolicy({ directives: { 'script-src-attr': null } }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(cors())

app.use('/api/v1/user', authenticationMiddleware, userRouter)
app.use('/api/v1/authentication', authenticationRouter)

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../client/build/') });
});

app.use(errorHandler)

try {
    const port = process.env.PORT || 5000
    mongoose.connect(process.env.MONGO_URI, { autoIndex: true })
    console.log('Connected to database...')
    server.listen(port, console.log(`listening on port ${port}...`));
} catch (err) {
    console.error(err);
};