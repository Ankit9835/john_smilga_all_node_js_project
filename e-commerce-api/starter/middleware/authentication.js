const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = (req,res,next) => {
    const token = req.signedCookies.token
    if(!token){
        throw new CustomError.UnauthenticatedError('no token found')
    }
    try{
        const {name,userId,roles} = isTokenValid({token})
        req.user = {name,userId,roles}
        next()
    } catch(error){
        console.log(error)
    }
   
}

const authorizedPermission = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.roles)){
            throw new CustomError.UnautherizedError('Unable to access')
        }
        next()
    }
}

module.exports = {authenticateUser,authorizedPermission}