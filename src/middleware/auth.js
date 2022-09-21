const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const booksModel = require("../models/booksModel")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(401).send({ status: false, message: "Please provide a token" })
        }

        jwt.verify(token, "humetanahibananahaii", function (err, decodedToken) {
            if (err && err.message == "jwt expired") {
                return res.status(401).send({ status: false, message: "Session expired! Please login again." })
            }
            if (err) {
                return res.status(401).send({ status: false, message: "Incorrect token" })
            }

            else {
                req.token = decodedToken.userId
                next()
            }
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const authorisation = async function (req, res, next) {
    try {
        let bookid = req.params.bookId

        if (!mongoose.Types.ObjectId.isValid(bookid)) {
            return res.status(400).send({ status: false, message: "Invalid Book Id" })
        }

        let validUser = req.token // userid from token

        let book = await booksModel.findById(bookid)
        let user = book.userId.toString() //userId from book

        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found or BookId doesnot exist" })
        }

        if (user !== validUser) {
            return res.status(403).send({ status: false, message: "Sorry! Unauthorized User" })
        }

        next()

    }

    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}



module.exports = { authentication, authorisation }