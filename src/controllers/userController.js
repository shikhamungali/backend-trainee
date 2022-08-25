const userModel = require("../models/userModel")


const createUser = async function(req,res){
    req.body["isFreeAppUser"] = req.isFreeAppUser
    let user = req.body
    let savedUser = await userModel.create(user)
    res.send({msg:savedUser})
}

const getUsersData = async function (req, res) {
    let allUsers = await userModel.find()
    res.send({ msg: allUsers })
}

module.exports.createUser = createUser
module.exports.getUsersData = getUsersData