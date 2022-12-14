const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {createTokenUser,attachCokkiesToResponse,checkPermission} = require('../utils')

const getAllUsers = async (req,res) => {
    const users = await User.find({roles:'user'}).select('-password')
    console.log(req.user)
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async (req,res) => {
    const user = await User.findOne({_id:req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError('user not found')
    }
    checkPermission(req.user,user._id)
    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = (req,res) => {
    res.status(StatusCodes.OK).json(req.user)
}

// const UpdateUser = async (req,res) => {
//     const {name,email} = req.body
//     if(!name || !email){
//         throw new CustomError.BadRequestError('please provide all values')
//     }
//     const user = await User.findByIdAndUpdate({_id:req.user.userId},{name,email},{new:true,runValidators:true})
//     const tokenUser = createTokenUser(user)
//     attachCokkiesToResponse({res,user:tokenUser})
//     res.status(StatusCodes.OK).json({user:tokenUser})
// }

const UpdateUser = async (req,res) => {
    const {name,email} = req.body
    if(!name || !email){
        throw new CustomError.BadRequestError('please provide all values')
    }
    const user = await User.findOne({_id:req.user.userId})
    user.name = name
    user.email = email
    await user.save()
    const tokenUser = createTokenUser(user)
    attachCokkiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.OK).json({user:tokenUser})
}

const updateUserPassword = async (req,res) => {
    const {oldPassword,newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('please provide all values')
    }
    const user = await User.findOne({_id:req.user.userId})
   // console.log(user)
    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('your current password is not correct please resend again')
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({msg:'password changed successfully'})
}

module.exports = {
    getAllUsers,getSingleUser,showCurrentUser,UpdateUser,updateUserPassword
}