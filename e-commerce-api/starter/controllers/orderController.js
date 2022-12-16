const CustomAPIError = require('../errors')
const Product = require('../models/Product')
const Review = require('../models/Review')
const Order = require('../models/Order')
const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue';
    return { client_secret, amount };
  };
  const { checkPermission } = require('../utils');
const { StatusCodes } = require('http-status-codes');

const createOrder = async (req,res) => {
    const { items:cartItems, tax,shippingFee } = req.body
   // console.log(cartItems)
    if(!cartItems || cartItems.length < 1){
        throw new CustomAPIError.BadRequestError('no orders into this cart')
    }
    if(!tax || !shippingFee){
        throw new CustomAPIError.BadRequestError('please provide tax and shipping fee')
    }
    let orderItems = [];
    let subtotal = 0;

    for(const item of cartItems){
        const dbProduct = await Product.findOne({_id:item.product})
        if(!dbProduct){
            throw new CustomAPIError.BadRequestError('no Product With this id found')
        }
        const {name,image,price,_id} = dbProduct
        const singleOrderItem = {
            amount:item.amount,
            name,price,image,product:_id
        }
        orderItems = [...orderItems,singleOrderItem]
        subtotal += item.amount * price
    }

    // calculate total
    const total = tax + shippingFee + subtotal
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd',
      });

    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId,
    })
    console.log(orderItems)
    console.log(subtotal)

    res.send('create order')
}

const getAllOrders = async (req,res) => {
    const orders = await Order.find({}).populate({
        path:'user',
        select:'name email roles'
    }).populate({
        path:'orderItems.product',
        select:'name price'
    })
    res.status(StatusCodes.OK).json({orders})
}


const getSingleOrder = async (req,res) => {
    const {id:orderId} = req.params
    const order = await Order.findOne({_id:orderId})
    if(!order){
        throw new CustomAPIError.BadRequestError('No Id found for this order')
    }
    checkPermission(req.user,order.user)
    res.status(StatusCodes.OK).json({order})
}

const getCurrentUserOrder = async (req,res) => {
    const order = await Order.find({user:req.user.userId})
    res.status(StatusCodes.OK).json({order})
}

const updateOrder = async (req,res) => {
    const {id:orderId} = req.params
    const {paymentIntent} = req.body
    const order = await Order.findOne({_id:orderId})
    if(!order){
        throw new CustomAPIError.BadRequestError('no order id found with given id')
    }
    order.paymentIntent = paymentIntent
    order.status = 'paid'
    await order.save()
    res.status(StatusCodes.OK).json({order})
}

const showAllMyOrder = async (req,res) => {
    const order = await Order.find({user:req.user.userId})
    res.status(StatusCodes.OK).json({order})
}

module.exports = {createOrder,getSingleOrder,getCurrentUserOrder,updateOrder,getAllOrders,showAllMyOrder}

