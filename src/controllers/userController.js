const userModel = require("../models/userModel")
const {
    isValidBody,
    isValidEmail,
    isValidName,
    isValidPassword,
    validPhone
} = require("../validation/validator");


const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { name, phone, email, password } = data;


        if (!isValidBody(data))
            return res
                .status(400)
                .send({ status: false, msg: "Request body cannot be empty" });


        if (!name || !isValidName(name))
            return res.status(400).send({
                status: false,
                message: "Name is required in a string format length should be 2 to 10",
            });


        if (!title || (title != "Mr" && title != "Mrs" && title != "Miss"))
            return res.status(400).send({
                status: false,
                msg: `Title is required in given format, format: "Mr","Mrs" or "Miss`,
            });

        if (!email || !isValidEmail(email.trim())) {
            return res
                .status(400)
                .send({ status: false, msg: "email is required in a valid format" });
        }

        let inputEmail = await userModel.findOne({ email: email });
        if (inputEmail)
            return res
                .status(400)
                .send({ status: false, msg: "Provided email is already registered" });

        if (!password || !isValidPassword(password))
            return res.status(400).send({
                status: false,
                msg: "Password is required with these conditions: at least one upperCase, lowerCase letter, one number and one special character",
            });



        if (!phone || !validPhone(phone))
            return res.status(400).send({
                status: false,
                message: "Name is required in a string format length should be 2 to 10",
            });




        let Users = await userModel.create(data)

        res.status(201).send({ status: true, data: Users });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};


module.exports.createUser = createUser
