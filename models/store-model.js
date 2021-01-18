const mongoose = require('mongoose')
const Schema = mongoose.Schema



const Store = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        minlength: 2,
        maxlength: 300,
    },
    owner: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        maxlength: 40,
    },
}, {
    timestamps: true
}, )


// INSTALL JOI / VALIDATE

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//          password: Joi.string().min(5).max(255).required()
//     }
//              return Joi.validate(user, schema)
// }


module.exports = mongoose.model('stores', Store);