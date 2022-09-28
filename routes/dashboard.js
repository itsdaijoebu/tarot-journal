const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')
const authController = require('../controllers/auth')
const { ensureAuth } = require('../middleware/auth')

// router.get('/', dashboardController.getReadings)
router.get('/', ensureAuth, dashboardController.getReadings)
router.get('/add-card', dashboardController.addCard)
// router.get('/readings', dashboardController.getReadings)
// router.post('/readings', dashboardController.postReading)

module.exports = router