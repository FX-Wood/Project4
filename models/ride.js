const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    start: Date,
    startFlex: Boolean,
    end: Date,
    endFlex: Boolean,
    note: String,
    offer: Number,
})

module.exports = mongoose.model('Ride', rideSchema)