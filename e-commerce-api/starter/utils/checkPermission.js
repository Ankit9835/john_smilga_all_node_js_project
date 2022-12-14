const CustomAPIError = require('../errors')

const checkPermission = (requestUser, resourceUserId) => {
    if(requestUser.roles === 'admin') return
    if(requestUser.userId === resourceUserId.toString()) return
    throw new CustomAPIError.UnautherizedError('not authoruzed to access this id')
}

module.exports = {checkPermission}