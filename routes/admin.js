const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const authController = require('../controllers/auth')
const { ensureAuth } = require('../middleware/auth')

router.get('/add-card', adminController.addCard)

module.exports = router