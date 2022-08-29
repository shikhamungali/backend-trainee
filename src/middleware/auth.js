const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authentication = async function (req,res,next){
    let token = req.headers["x-Auth-token"];
    if (!token) 
        {token = req.headers["x-auth-token"]};
    if (!token) 
       { return res.send({ status: false, msg: "token must be present" })};
next()
    }

const authorization = async function (req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];


    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    if (decodedToken.userId !== req.params.userId) {
        return res.send({ status: false, msg: "UserId or Token is Wrong" });
    }
    else { next() }
}



    const params = async function (req,res,next){
     let userId = req.params.userId;
     let userDetails = await userModel.findById(userId);
     if (!userDetails)
         {return res.send({ status: false, msg: "No such user exists" })}   

        next()
      }   


module.exports.authentication = authentication
module.exports.authorization = authorization
module.exports.params = params