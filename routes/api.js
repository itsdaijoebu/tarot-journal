const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')
const authController = require('../controllers/auth')
const { ensureAuth } = require('../middleware/auth')

router.get('/getCards', apiController.getCards)
router.get('/getCardbacks', apiController.getCardbacks)
router.get('/getCardfaces', apiController.getCardfaces)
router.get('/getCardCollections', apiController.getCardCollections)
router.get('/getSpreads', apiController.getSpreads)

module.exports = router