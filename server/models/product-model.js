const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Product = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
    },
    images: {
        type: Array,
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        maxlength: 2,
    },
    stock_quantity: {
        type: Number,
        required: true,
    },
    storeID: {
        type: String,
        required: true,
    }, 
    categories: {
        type: Array,
    }

}, {timestamps: true});


// INSTALL JOI / VALIDATE

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//          password: Joi.string().min(5).max(255).required()
//     }
//              return Joi.validate(user, schema)
// }


module.exports = mongoose.model('products', Product);