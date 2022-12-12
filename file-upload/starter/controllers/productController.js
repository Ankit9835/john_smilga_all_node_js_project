const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const createProducts = (req,res) => {
    res.send('create products')
}

const getAllProducts = (req,res) => {
    res.send('get all products')
}

module.exports = {createProducts,getAllProducts}