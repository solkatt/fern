const express = require('express')
const router = express.Router()
const StoreCtrl = require('../controllers/store-ctrl')

//Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

/// Examples
// router.post('/store', auth, admin, StoreCtrl.createStore)
router.post('/store', StoreCtrl.createStore)
router.put('/store/:id', StoreCtrl.updateStore)
router.get('/store/:id', StoreCtrl.getStoreById)
router.get('/stores', StoreCtrl.getStores)

router.post('/store/upload-image', StoreCtrl.uploadStoreImage)
router.get('/storefront/:name', StoreCtrl.getStoreByName)
router.put('/store/:id/delete-image/', StoreCtrl.deleteStoreImage)


module.exports = router