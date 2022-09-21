const booksModel = require("../models/booksModel")
const reviewModel = require("../models/reviewModel")



//======================================== review creation =====================================
const createReview = async function (req, res) {
    try {

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}





//========================================= review updation ===========================================

const updateReview = async function (req, res) {
    try {

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}











//=========================================== delete review ===========================================

const deleteReview = async function (req, res) {
    try {

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}







module.exports = { createReview, updateReview, deleteReview }
