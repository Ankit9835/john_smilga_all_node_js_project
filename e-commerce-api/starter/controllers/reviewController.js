const Review = require('../models/Review')
const Product = require('../models/Product')
const CustomAPIError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const {checkPermission} = require('../utils')

const createReview = async (req,res) => {
    const {product:productId} = req.body
    const isValidProduct = await Product.findOne({_id:productId})
    if(!isValidProduct){
        throw new CustomAPIError.NotFoundError(`No Product with this ${productId} found`)
    }
    const alreadySubmitted = await Review.findOne({product:productId,user:req.userId})
    if(alreadySubmitted){
        throw new CustomAPIError.NotFoundError(`Review Already Submitted From This Iser For This Product`)
    }
    req.body.user = req.user.userId
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({review})
}

const getAllReviews = async (req,res) => {
    const reviews = await Review.find({}).populate({
        path:'product',
        select:'name company price'
    })
    res.status(StatusCodes.OK).json({reviews})
}

const getSingleReview = async (req,res) => {
    const {id:reviewId} = req.params
    const review = await Review.findOne({_id:reviewId})
    if(!review){
        throw new CustomAPIError.NotFoundError(`review not found for this ${reviewId}`)
    }
    res.status(StatusCodes.OK).json({review})
}

const updateReview = async (req,res) => {
    const {id:reviewId} = req.params
    const { rating, title, comment } = req.body;

    const review = await Review.findOne({_id:reviewId})
    if(!review){
        throw new CustomAPIError.NotFoundError(`no review found for this ${reviewId}`)
    }
    checkPermission(req.user, review.user);

    review.rating = rating;
    review.title = title;
    review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
}

const deleteReview = async (req,res) => {
     const {id:reviewId} = req.params
     const review = await Review.findOne({_id:reviewId})
    // console.log('123')
    if(!review){
        throw new CustomAPIError.NotFoundError(`no review found for this ${reviewId}`)
    }
    checkPermission(req.user,review.user)
    await review.remove()
    res.status(StatusCodes.OK).json({msg:'Review successfully removed'})
}


module.exports = {createReview,getAllReviews,getSingleReview,updateReview,deleteReview}