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
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
 router.get('/store/:id', StoreCtrl.getStoreById)
 router.get('/stores', StoreCtrl.getStores)


module.exports = router