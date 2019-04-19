const router = require('express').Router();
const Ride = require('../models/ride');

router.route('/')
    .post((req, res) => {
        console.log('POST', req.originalUrl)
        const ride = new Ride(req.body)
        ride.save((err, ride) => {
            if (err) {
                console.log('ride creation err', err)
                // this error message is deliberately vague. The front end should supply more robust feedback
                res.status(404).json({type: 'error', message: 'There was an error creating your ride'})
            } else {
                res.status(201).json({type: 'success', message: `Hitting the hill on ${ride.start}`})
            }
        })
    })

module.exports = router