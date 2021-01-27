const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Order = new Schema({

    // store: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Store'
    // },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true
    },
    adress: [{
        street: String,
        city: String,
        zip: Number,
    }],
    phone: {
        type: Number,
        required: true
    },
    sent: {
        type: Boolean,
        default: false,
        required: true,
    },
    payment_method: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    products: [
        {product: String, productID: String, price: Number, quantity: Number}],
   
    storeID: {
        type: String,
        required: true,
    },
   
}, {
    timestamps: true
});


// INSTALL JOI / VALIDATE

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//          password: Joi.string().min(5).max(255).required()
//     }
//              return Joi.validate(user, schema)
// }


module.exports = mongoose.model('orders', Order);