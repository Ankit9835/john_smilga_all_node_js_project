const express = require('express');
const router = express.Router();

const {dashboard,login} = require('../controllers/main')
const auth = require('../middleware/auth')

router.route('/dashboard').get(auth,dashboard);
router.route('/login').post(login);

module.exports = router