const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors/')
const jwt = require('jsonwebtoken')
const {createJwt, attachCokkiesToResponse,createTokenUser} = require('../utils')

const register = async (req,res) => {
    const {name,email,password} = req.body
    const emailAlreadyExist = await User.findOne({email})
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email Already Exists')
    }
    const isAdmin = (await User.countDocuments({})) === 0;
   // console.log(isAdmin)
    const roles = isAdmin ? 'admin' : 'user';
    const user = await User.create({name,email,password,roles})
    const tokenUser = createTokenUser(user)
    attachCokkiesToResponse({res, user:tokenUser})
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const login = async (req,res) => {
   const {email,password} = req.body
   if(!email || !password){
    throw new CustomError.BadRequestError('please provide all details')
   }
   const user = await User.findOne({email})
   if(!user){
    throw new CustomError.UnauthenticatedError('invalid credentials')
   }
   const isPasswordCorrect = await user.comparePassword(password)
   if(!isPasswordCorrect){
    throw new CustomError.UnauthenticatedError('invalid credential')
   }
   const tokenUser = createTokenUser(user)
   attachCokkiesToResponse({res, user:tokenUser})
   res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const logout = (req,res) => {
   res.cookie('token', 'logout', {
    httpOnly:true,
    expires:new Date(Date.now())
   })
   res.status(StatusCodes.OK).json({msg:'user logout'})
}

module.exports = {
    register,login,logout
}