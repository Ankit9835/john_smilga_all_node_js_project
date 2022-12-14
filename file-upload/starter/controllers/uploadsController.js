const {StatusCodes} = require('http-status-codes')
const path = require('path')
const cloudinary = require('cloudinary').v2;
const CustomError = require('../errors/')
const fs = require('fs')

const uploadImageProductLocal = async (req,res) => {
    console.log(req.files)
    if(!req.files){
        throw new CustomError.BadRequestError('Please Upload A Image')
    }
    const productImage = req.files.image
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload only image format file')
    }
    const imgSize = 1024 * 1024
    if(productImage.size > imgSize){
        throw new CustomError.BadRequestError('File Image is too big')
    }
    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath)
    return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
}

const uploadImageProduct = async (req,res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: 'file-upload',
        }
      );
      fs.unlinkSync(req.files.image.tempFilePath);
      return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}

module.exports = {uploadImageProduct}