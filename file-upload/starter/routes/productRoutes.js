const express = require('express')
const router = express.Router()

const {createProducts,getAllProducts} = require('../controllers/productController')
const {uploadImageProduct} = require('../controllers/uploadsController')

router.route('/').post(createProducts).get(getAllProducts)
router.route('/uploads').post(uploadImageProduct)

module.exports = router