const userModel = require("../models/userModel")
const { isValidBody, isValidEmail, isValidName, isValidPassword, isvalidPhone, isvalidPincode } = require("../validation/validator");
const jwt = require('jsonwebtoken')




//-------------------------------------- user creation --------------------------------------------------

const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { name, phone, email, password, title, address } = data;

        //======================== if data is not entered in body =====================================
        if (!isValidBody(data))
            return res
                .status(400)
                .send({ status: false, msg: "Request body cannot be empty" });

        //=================== name is mandatory and is of valid format ==================================
        if (!name || !isValidName(name))
            return res.status(400).send({
                status: false,
                message: "Name is required in a string format length should be 2 to 10",
            });
        req.body.name = name.replace(/\s+/g, ' ')
        //============================ title is mandatory and is of valid format =============================
        if (!title || (title != "Mr" && title != "Mrs" && title != "Miss"))
            return res.status(400).send({
                status: false,
                msg: `Title is required in given format, format: "Mr","Mrs" or "Miss`,
            });

        // ========================== email is mandatory and is of valid format ===============================
        if (!email || !isValidEmail(email.trim())) {
            return res
                .status(400)
                .send({ status: false, msg: "email is required in a valid format" });
        }
        //=============================== duplicate email =======================================
        let inputEmail = await userModel.findOne({ email: email });
        if (inputEmail)
            return res
                .status(400)
                .send({ status: false, msg: `${email} is already registered` });
        //================================ password is mandatory and should of valid format ==============
        if (!password || !isValidPassword(password))
            return res.status(400).send({
                status: false,
                msg: "Password is required with these conditions: at least one upperCase, lowerCase letter, one number and one special character",
            });
        //======================== phone no. is mandatory and should be indian no. =======================
        if (!phone || !isvalidPhone(phone))
            return res.status(400).send({
                status: false,
                message: "phone no. is required in a string format length should be of 10",
            });
        //============================= duplicate phone no. ========================================
        let inputPhone = await userModel.findOne({ phone: phone });
        if (inputPhone)
            return res
                .status(400)
                .send({ status: false, msg: `${phone} is already registered ` });
        //============================ validating address =======================================
        if (address && typeof address != "object") {
            return res.status(400).send({ status: false, message: "Address is in wrong format" })
        };

        if (address && address.pincode && !isvalidPincode(address.pincode)) {
            return res.status(400).send({ status: false, message: "Pincode is in wrong format" })
        };

        //=============================== creating user =============================================
        let Users = await userModel.create(data)
        res.status(201).send({ status: true, data: Users });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};





//-----------------------------------------------user login --------------------------------------------------------

const userLogin = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data
        //================================= if data is not entered in body ==================================
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, message: "Body can't be empty! Please Provide Data" })
        //=================================== email not entered ==========================================
        if (!email)
            return res.status(400).send({ status: false, message: "Please provide Email to login" })

        if (!isValidEmail(email.trim())) {
            return res.status(400).send({ status: false, msg: "invalid email format" });
        }
        //================================= password not entered =======================================
        if (!password)
            return res.status(400).send({ status: false, message: "Please provide Password to login" })

        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: "invalid password format" });
        }
        //============================= invalid email or password ======================================
        const findUser = await userModel.findOne({ email: email, password: password })
        if (!findUser)
            return res.status(401).send({ status: false, message: "Invalid email or Password" })

        // ========================= token creation ===============================================
        let token = jwt.sign({ userId: findUser._id }, "humetanahibananahaii", { expiresIn: '1h' })
        let decode = jwt.decode(token, "humetanahibananahaii")
        console.log(decode)

        res.status(201).send({ status: true, message: "User logged in Successfully", data: {token:token,iat:decode.iat,exp:decode.exp} })
    }

    catch (err) {
        res.status(500).send({ status: false, message: "Server Error" })
    }
}



module.exports = { createUser, userLogin }
