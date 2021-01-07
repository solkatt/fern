const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    time: {
        type: [String],
        required: true
    },
}, {
    timestamps: true
}, )


// INSTALL JOI / BALIDATE

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//          password: Joi.string().min(5).max(255).required()
//     }
//              return Joi.validate(user, schema)
// }


module.exports = mongoose.model('users', User);