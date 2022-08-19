const publisherModel = require('../models/publisherModel')

const createPublisher = async function (req,res){
    let publisher = req.body
    let newPublisher = await publisherModel.create(publisher)
    res.send({data:newPublisher})
}

const getPublisher = async function(req,res){
    let publisher = await publisherModel.find()
    res.send({data:publisher})
}


module.exports.createPublisher = createPublisher
module.exports.getPublisher = getPublisher