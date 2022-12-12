const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const demoUser = require('../middleware/testUser')

const rateLimiter = require('express-rate-limit')
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: {
      msg: 'Too many requests from this IP, please try again after 15 minutes',
    },
  });

const { register, login, updateUser } = require('../controllers/auth')
router.post('/register', apiLimiter, demoUser, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authenticateUser, demoUser, updateUser)

module.exports = router
