const express = require('express')
const router = express.Router()
const OrderCtrl = require('../controllers/order-ctrl')

//Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

/// Examples
// router.post('/store', auth, admin, StoreCtrl.createStore)
router.post('/order', OrderCtrl.createOrder)

// router.get('/store/:id/products', ProductCtrl.getProductsByStore)


// router.put('/product/:id', ProductCtrl.updateProduct)
// router.delete('/product/:id', ProductCtrl.deleteProduct)
// router.get('/product/:id', ProductCtrl.getProductById)


module.exports = router