const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const moment = require('moment')

const createOrder = async function(req,res){
    req.body["isFreeAppUser"] = req.isFreeAppUser;

    let data = req.body
    if (!(data.userId && data.productId)){
        return res.send({msg:"PLEASE ENTER userId and productId"})
    }
    let user = await userModel.findById(data.userId)
    let product = await productModel.findById(data.productId)
    if (!(user && product)){
        return res.send({msg:"userId or productId is not valid.PLEASE enter valid id`s"})
    }

    const date = moment().format('DD/MM/YYYY');
    data['date'] = date

    let amount = 0;
    if (data['isFreeAppUser'] === "true"){
        amount = 0
    }else{
        amount = product.price
    }
    
    if(user.balance<amount){
        return res.send ({msg:"User has insufficient balance"})
    }else{
        updatedBalance = await userModel.findById(data.userId).updateOne({$inc:{balance:-amount}})
    }

    data['amount'] = amount
    const savedOrder = await orderModel.create(data)
    res.send({msg:savedOrder})
}


module.exports.createOrder=createOrder