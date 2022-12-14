const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizedPermission
  } = require('../middleware/authentication');
const {getAllUsers,getSingleUser,showCurrentUser,UpdateUser,updateUserPassword} = require('../controllers/userController')


router
  .route('/')
  .get(authenticateUser,authorizedPermission('admin','owner'),getAllUsers);
router.route('/showMe').get(authenticateUser,showCurrentUser)
router.route('/updateuser').patch(authenticateUser,UpdateUser)
router.route('/updateUserPassword').patch(authenticateUser,updateUserPassword)
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router