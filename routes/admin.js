const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const authController = require('../controllers/auth')
const { ensureAuth } = require('../middleware/auth')

router.get('/edit-collection', adminController.editCollection)
router.post('/add-card', adminController.addCard)
router.post('/add-card-image', adminController.addCardImage)
module.exports = router