const express = require('express')

const { auth } = require('../controllers/auth-ctrl')

const router = express.Router()


router.post('/auth', auth)


module.exports = router