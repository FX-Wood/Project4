const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    date: String,
    goHour: Number,
    goMin: Number,
    goflex: Boolean,
    endHour: Number,
    endMin: Number,
    endFlex: String,
    note: String,
    offer: Number,
})

module.exports = mongoose.model('Ride', rideSchema)