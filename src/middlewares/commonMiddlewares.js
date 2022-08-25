const headerValidation = function(req,res,next){
    let { isfreeappuser } = req.headers
    if (isfreeappuser === undefined || isfreeappuser == "") {
        res.send("Request is missing a mandatory header")
    } else {
        req.isFreeAppUser = isfreeappuser;
        next()
    }
}

module.exports.headerValidation=headerValidation

//NOTE: In some of the below apis a header validation is to be performed (create user and create order). The name of the header is ‘isFreeAppUser’. Write a header validation that simply checks whether this header is present or not. Please note this validation should only be called in create user and create order apis. Perform this validation in a middleware.