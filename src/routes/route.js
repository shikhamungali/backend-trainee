const express = require('express');
const router = express.Router();
const {createUser,userLogin} = require("../controllers/userController")
const {createBooks,getBooks} = require("../controllers/booksController")
const {authentication} = require("../middleware/auth")

//========================= user apis ========================================================
router.post("/register",createUser)
router.post("/login",userLogin)


//========================= book apis =========================================================

router.post("/books", authentication, createBooks)
router.get("/books", authentication, getBooks)


//================================= review apis =================================================









//======================== to check if the endpoint is correct or not =========================================
router.all("/**", function (req, res) {         
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})





module.exports = router;