const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const config = require('config')
const { boolean } = require('joi')

const User = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
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
    storeID: {
        type: String
    },
    isAdmin: Boolean,
}, {
    timestamps: true
}, )

User.methods.generateAuthToken = function() {
    const payload = {
        _id: this._id,
        isAdmin: this.isAdmin
    }
    const token = jwt.sign(payload, config.get('jwtPrivateKey'))
    return token
}


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