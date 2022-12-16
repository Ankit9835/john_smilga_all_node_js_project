const express = require('express')
const router = express.Router()
const {createOrder,getSingleOrder,getCurrentUserOrder,updateOrder,getAllOrders,showAllMyOrder} = require('../controllers/orderController')
const {
    authenticateUser,
    authorizedPermission
  } = require('../middleware/authentication');

  router.route('/').post(authenticateUser,createOrder).get(authenticateUser,authorizedPermission('admin'),getAllOrders)
  router.route('/showAllMyOrders').get(authenticateUser,showAllMyOrder)
  router.route('/:id').get(authenticateUser,getSingleOrder).patch(authenticateUser,updateOrder)
  

  module.exports = router