const {StatusCodes} = require('http-status-codes')
const path = require('path')

const uploadImageProduct = async (req,res) => {
    const productImage = req.files.image
    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath)
    return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
}

module.exports = {uploadImageProduct}