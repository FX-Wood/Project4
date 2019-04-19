require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const loginLimiter = new RateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, 
    delayMs: 0, // disabled
    message: JSON.stringify({type: 'error', message: "Maximum login attempts exceeded!" })
})

const signupLimiter = new RateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    delayMs: 0, // disabled
    message: JSON.stringify({type: 'error', message: 'Account creation maximum exceeded!' })
})

mongoose.connect('mongodb://localhost/project4', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('open', () => {
    console.log(`Connected to Mongo on ${db.host}: ${db.port}`)
})
db.on('error', (err) => {
    console.log(`Database error:\n${err}`)
})

app.use('/auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'))
app.use('/user', expressJWT({ secret: process.env.JWT_SECRET }), require('./routes/user'))

app.listen(process.env.PORT, () => {
    console.log(`You're listening to the sweet sounds of ${process.env.PORT} project4 in the morning...`)
    console.log(`Oh, and the port is`, process.env.PORT)
})