const express = require('express')
const router = express.Router()
const ProductCtrl = require('../controllers/product-ctrl')

//Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

/// Examples
// router.post('/store', auth, admin, StoreCtrl.createStore)
router.post('/product', ProductCtrl.createProduct)
router.post('/product/upload-image', ProductCtrl.uploadProductImage)

router.put('/product/:id/delete-image/', ProductCtrl.deleteProductImage)
router.get('/store/:id/products', ProductCtrl.getProductsByStore)


router.put('/product/:id', ProductCtrl.updateProduct)
router.delete('/product/:id', ProductCtrl.deleteProduct)
router.get('/product/:id', ProductCtrl.getProductById)
router.get('/products', ProductCtrl.getAllProducts)


module.exports = router