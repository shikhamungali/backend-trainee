const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");




/////============================================== CREATING A USER ========================================

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (!data) {
      res.status(400).send({ msg: "body is empty.please enter keys" })
    }
    let savedData = await userModel.create(data);
    res.status(201).send({ msg: savedData });
  }

  catch (error) {
    res.status(500).send({ error: error.message })
  }
};

////=================================== WHEN USER LOGIN =========================================================

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!(userName && password))
      return res.status(400).send({
        status: false,
        msg: "please enter userName and password"
      });
    if (!user)
      return res.status(401).send({
        status: false,
        msg: "username or the password is not correct",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(), //////////////// PAYLOAD
        batch: "PLUTONIUM",
        organisation: "FunctionUp",
      },
      "functionup-plutonium-very-very-secret-key" //// SECRET KEY
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, token: token });
  }

  catch (error) {
    res.status(500).send({ error: error.message })
  }
};



////============================================ GET USER DATA ===================================================

const getUserData = async function (req, res) {
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });
  res.status(200).send({ status: true, data: userDetails });
}
  catch (error) {
    res.status(500).send({ error: error.message })
  }
};

/////======================================== UPDATE USER DATA =========================================

const updateUser = async function (req, res) {
 try{ let userData = req.body;
  let userId = req.params.userId;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
  res.status(201).send({ status: updatedUser, data: updatedUser });}

  catch (error) {
    res.status(500).send({ error: error.message })
  }
};

/////================================= DELETING A USER ==========================================================

const deleteUser = async function (req, res) {
 try{ let userId = req.params.userId;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { isDeleted: true },
    { new: true }
  );
  res.status(201).send({ status: true, data: updatedUser });}
  catch (error) {
    res.status(500).send({ error: error.message })
  }
}



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
