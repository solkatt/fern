const Order = require('../models/order-model')

// const upload = require("../services/ImageUpload");


const config = require('config')

// const multipleUpload =.array('photos', 12)



createOrder = (req, res) => {


    console.log(req.body)

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a order',
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}



// updateOrder = async (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a product to update',
//         })
//     }

//     Product.findOne({
//         _id: req.params.id
//     }, (err, product) => {
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Product not found!',
//             })
//         }
//         product.name = body.name
//         product.description = body.description
//         product.price = body.price
//         product.stock_quantity = body.stock_quantity
//         product.categories = body.categories
//         product.time = body.time
//         product
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     id: product._id,
//                     message: 'Product updated!',
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     error,
//                     message: 'Product not updated!',
//                 })
//             })
//     })
// }

// deleteProduct = async (req, res) => {
//     await Product.findOneAndDelete({
//         _id: req.params.id
//     }, (err, product) => {
//         if (err) {
//             return res.status(400).json({
//                 success: false,
//                 error: err
//             })
//         }

//         if (!product) {
//             return res
//                 .status(404)
//                 .json({
//                     success: false,
//                     error: `Product not found`
//                 })
//         }

//         return res.status(200).json({
//             success: true,
//             data: product
//         })
//     }).catch(err => console.log(err))
// }




// getOrderById = async (req, res) => {
//     await Product.findOne({
//         _id: req.params.id
//     }, (err, product) => {
//         if (err) {
//             return res.status(400).json({
//                 success: false,
//                 error: err
//             })
//         }

//         if (!product) {
//             return res
//                 .status(404)
//                 .json({
//                     success: false,
//                     error: `Product not found`
//                 })
//         }
//         return res.status(200).json({
//             success: true,
//             data: product
//         })
//     }).catch(err => console.log(err))
// }


// getOrderByStore = async (req, res) => {

//     const storeID = req.params.id


//     await Product.find({
//         storeID: storeID
//     }, (err, products) => {
//         if (err) {
//             return res.status(400).json({
//                 success: false,
//                 error: err
//             })
//         }
//         if (!products.length) {
//             return res
//                 .status(404)
//                 .json({
//                     success: false,
//                     error: `No Products found`
//                 })
//         }
//         return res.status(200).json({
//             success: true,
//             data: products
//         })
//     }).catch(err => console.log(err))
// }







module.exports = {
    createOrder,
    // updateOrder,
    // deleteOrder,
    // getOrdersByStore,
    // getOrderById,
}