const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName: String,
    lastName: String,
    skier: Boolean,
    snowboarder: Boolean,
}, {
    timestamps: true
})

profileSchema.virtual('fullName')
    .get(function() {
        return this.firstName + this.lastName
    })

module.exports = mongoose.model('Profile', profileSchema)