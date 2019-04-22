const router = require('express').Router();
const Ride = require('../models/ride');
const User = require('../models/user');

router.get('/', (req, res) => {
    console.log('GET /share')
    Ride.find().populate({ path: 'user', select: 'safe' }).exec((err, rides) => {
        if (err) {
            console.log('error finding rides')
            res.status(500).json({type: 'error', message: 'error finding rides'})
        } else {
            console.log('found rides')
            console.log(rides)
            res.status(200).json({type: 'success', message: 'found rides', data: rides})
        }
    })
})

module.exports = router;