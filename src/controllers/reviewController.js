const { default: mongoose } = require("mongoose")
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
        let bookid = req.params.bookId
        let reviewid = req.params.reviewId
        let data = req.body
        const { review, rating, reviewedBy} = data

        if(!mongoose.Types.ObjectId.isValid(bookid)) return res.status(400).send({status : false, message : "Invalid Format of BookId"})

        if(!mongoose.Types.ObjectId.isValid(reviewid)) return res.status(400).send({status : false, message : "Invalid Format of ReviewId"})

        let book = await booksModel.findOne({_id : bookid})
        if(!book) return res.status(404).send({status : false, message : "Sorry! Book Not Found!"})
        if(book.isDeleted == true) return res.status(400).send({status : false, message : "Book is Deleted. You cannot add review"})
        
        let findreview = await reviewModel.findOne({_id : reviewid})
        if(!findreview) return res.status(404).send({status : false, message : "Sorry! No such review found!"})
        if(findreview.isDeleted == true) return res.status(400).send({status : false, message : "Review is Deleted. You cannot update review"})

        if(Object.keys(data).length == 0){
            return res.status(400).send({status : false, message : "Please provide data to update book review"})
        }

        if(!(review || rating || reviewedBy)){
            return res.status(400).send({status : false, message : "You cannot update book using invalid key"})
        }

        let updateReview = await reviewModel.findOneAndUpdate({_id : reviewid},{review : review, rating : rating, reviewedBy : reviewedBy},{new : true})
        res.status(200).send({status : true, message : "BookReview is updated", data : updateReview})

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
