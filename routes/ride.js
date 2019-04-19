const router = require('express').Router();
const Ride = require('../models/ride');

router.route('/')
    .post((req, res) => {
        console.log('POST', req.originalUrl)
        const ride = new Ride(req.body)
        ride.save()
    })

module.exports = router