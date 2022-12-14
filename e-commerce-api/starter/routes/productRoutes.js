const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizedPermission
  } = require('../middleware/authentication');
  const { createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage} = require('../controllers/productController')

    router.route('/').post(authenticateUser,authorizedPermission('admin'),createProduct).get(getAllProducts)
    router.route('/:id').get(getSingleProduct).patch(authenticateUser,authorizedPermission('admin'),updateProduct).delete(deleteProduct)
    router.route('/uploadimage').post(authenticateUser,authorizedPermission('admin'),uploadImage)

    module.exports = router