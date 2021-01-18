const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    time: {
        type: [String],
        required: true
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished
        }
    },
}, {
    timestamps: true
}, )

// module.exports = mongoose.model('users', User);