const mongoose = require('mongoose');

const Schema = mongoose.Schema

const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const carpoolSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    days: [{
        type: String,
        enum: validDays
    }],
    starting_location: {
        type: String,
        required: true
    },
    ending_location: {
        type: String,
        required: true
    },
    interval: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    vehicle_type: {
        type: String,
        required: true
    },
    seater: {
        type: Number,
        required: true
    },
    stops: [{
        type: String,
    }],
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('carpoolcollection', carpoolSchema)
