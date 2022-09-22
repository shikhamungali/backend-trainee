const express = require('express');
const router = express.Router();
const { createUser, userLogin } = require("../controllers/userController")
const { createBooks, getBooks, getBookById, updateBooks } = require("../controllers/booksController")
const { authentication, authorisation } = require("../middleware/auth");
const { createReview } = require('../controllers/reviewController');

//========================= user apis ========================================================
router.post("/register", createUser)
router.post("/login", userLogin)


//========================= book apis =========================================================

router.post("/books", authentication, createBooks)
router.get("/books", authentication, getBooks)
router.get("/books/:bookId", authentication, getBookById)
router.put("/books/:bookId", authentication, authorisation, updateBooks)



//================================= review apis =================================================
router.post("/books/:bookId/review", createReview)









//======================== to check if the endpoint is correct or not =========================================
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})





module.exports = router;