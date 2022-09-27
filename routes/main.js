const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/signin', authController.getSignin)
router.post('/signin', authController.postSignin)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/signout', authController.signout)

module.exports = router