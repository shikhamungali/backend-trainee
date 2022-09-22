const { default: mongoose } = require("mongoose")
const booksModel = require("../models/booksModel")
const reviewModel = require("../models/reviewModel")

const createReview = async function (req, res) {
   try{ 
    // params: bookId
    const bookId = req.params.bookId;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).send({ status: false, message: "Invalid Book Id" })
    }

    // review - body
    const { review, rating, reviewedBy } = req.body;

    // validate review body
    if (!review) {
        return res.status(400).send({ status: false, message: "Review can't be empty" })
    }

    if (!rating) {
        return res.status(400).send({ status: false, message: "Rating can't be empty" })
    }

    if (isNaN(rating)) {
        return res.status(400).send({ status: false, message: "Rating should be a number" })
    }

    if (!reviewedBy) {
        return res.status(400).send({ status: false, message: "ReviewedBy can't be empty" })
    }

    // bookId -> book exists
    const book = await booksModel.findOne({ _id: bookId });
    // !exists - ERRROR
    if (!book) {
        return res.status(404).send({ status: false, message: "Book not found" })
    }

    // add review
    const newReview = await reviewModel.create({
        bookId,
        rating,
        reviewedBy,
        review
    })
    // increment review count of book by 1
    book.reviews += 1
    await book.save();

    return res.status(200).send({ status: true, message: "Review Added", data: newReview })
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
        const { review, rating, reviewedBy } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please provide data to update book review" })
        }

        if (!mongoose.Types.ObjectId.isValid(bookid)) {
            return res.status(400).send({ status: false, message: "Invalid Format of BookId" })
        }

        if (!mongoose.Types.ObjectId.isValid(reviewid)) {
            return res.status(400).send({ status: false, message: "Invalid Format of reviewId" })
        }

        let book = await booksModel.findOne({ _id: bookid })
        if (!book) {
            return res.status(404).send({ status: false, message: "Sorry! Book Not Found!" })
        }
        if (book.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Book is Deleted. You cannot add/update review" })
        }

        let findreview = await reviewModel.findOne({ _id: reviewid })
        if (!findreview) {
            return res.status(404).send({ status: false, message: "Sorry! No such review found!" })
        }
        if (findreview.isDeleted == true){ 
            return res.status(400).send({ status: false, message: "Review is Deleted. You cannot update review" })
        }

        if (!(review || rating || reviewedBy)) {
            return res.status(400).send({ status: false, message: "You cannot update book using invalid key" })
        }

        let updateReview = await reviewModel.findOneAndUpdate({ _id: reviewid }, { review: review, rating: rating, reviewedBy: reviewedBy }, { new: true })
        res.status(200).send({ status: true, message: "BookReview is updated", data: updateReview })
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
