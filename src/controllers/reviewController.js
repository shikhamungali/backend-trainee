const { default: mongoose } = require("mongoose");
const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel");

const createReview = async function (req, res) {
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

module.exports = { createReview }