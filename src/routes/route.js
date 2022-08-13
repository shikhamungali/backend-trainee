const express = require('express');
const router = express.Router();
const BookModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
 ///////======================= to create entries of books in database ========================///////////////

router.post("/createBooksData", UserController.createBooksData  )

////========================== to get the list of all books =====================//////////////// 

router.get("/getBooksData", UserController.getBooksData)

module.exports = router;





