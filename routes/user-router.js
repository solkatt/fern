const express = require('express')
const router = express.Router()

//Controllers
const {registerUser, getCurrentUser, updateUserStoreID} = require('../controllers/user-ctrl')

//Middleware
const auth = require('../middleware/auth')


router.get('/me',auth, getCurrentUser )

router.put('/user/:id', updateUserStoreID)

router.post('/user', registerUser)


module.exports = router