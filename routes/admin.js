const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const authController = require('../controllers/auth')
const { ensureAuth } = require('../middleware/auth')
const upload = require('../middleware/multer')

router.get('/edit-collection', adminController.editCollection)
router.post('/add-card', adminController.addCard)
router.post('/add-cardface', upload.single('cardfaceFile'), adminController.addCardface)
router.post('/add-cardback', upload.single('cardbackFile'), adminController.addCardback)
router.post('/add-card-collection', adminController.addCardCollection)
router.post('/add-spread', adminController.addSpread)
module.exports = router