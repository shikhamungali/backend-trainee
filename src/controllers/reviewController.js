const { default: mongoose } = require("mongoose")
const booksModel = require("../models/booksModel")
const reviewModel = require("../models/reviewModel")
const { isValid } = require("../validation/validator")



//=================================== creating of review ==============================================

const createReview = async function (req, res) {
    try {
        let data = req.body
        data.bookId = bookId
        const bookId = req.params.bookId;
        const { review, rating, reviewedBy } = data
        //=============================if invalid format of book id ===================================
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid Book Id" })
        }
        //======================== if body is empty ===============================================
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Body can't be empty! Provide Data to create review" })
        }
        //========================================= review is mandatory ==================================
        if (!review) {
            return res.status(400).send({ status: false, message: "Review is mandatory" })
        }
        //============================== if review is of invalid format ===============================
        if (review) {
            if (!isValid(review)) return res.status(400).send({ status: false, message: "Review is in Invalid Format" })

            req.body.review = review.replace(/\s+/g, ' ')
        }
        //======================================= rating is mandatory ===================================
        if (!rating) {
            return res.status(400).send({ status: false, message: "Rating is mandatory" })
        }
        //========================= if rating is not of valid format ================================
        if (rating) {
            if (!(typeof rating == "number")) {
                return res.status(400).send({ status: false, message: "Rating should be a number" })
            }

            if (Number.isInteger(rating)) {
                if (rating < 1 || rating > 5) {
                    return res.status(400).send({ status: false, message: "Rating can only be 1,2,3,4,5" })
                }
            }
            else {
                return res.status(400).send({ status: false, message: "Rating can be only Integer and Whole Number" })
            }
        }
        //============================= if reviewedBy is not enter in the body ===========================
        if (!reviewedBy) {
            req.body.reviewedBy = "Guest"
        }
        //================================== if reviewedBy is not of valid format ==========================
        if (reviewedBy) {
            if (!isValid(reviewedBy)) {
                return res.status(400).send({ status: false, message: "Your name is in Invalid Format" })
            }
            req.body.reviewedBy = reviewedBy.replace(/\s+/g, ' ')
        }
        //============================== if book not found ==========================================
        const book = await booksModel.findOne({ _id: bookId })
        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        //================================== creation of review ======================================
        const newReview = await reviewModel.create(data)
        const obj = {
            _id: newReview._id,
            bookId: newReview.bookId,
            reviewedBy: newReview.reviewedBy,
            reviewedAt: newReview.reviewedAt,
            rating: newReview.rating,
            review: newReview.review
        }
        //================================= increment of reviews in bookmodel ============================
        const addReview = await booksModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: 1 } }, { new: true }).lean()
        addReview["reviewsData"] = obj

        return res.status(200).send({ status: true, message: "Review Added", data: addReview })
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
        //======================== if bookid is not of valid format ==============================
        if (!mongoose.isValidObjectId(bookid)) {
            return res.status(400).send({ status: false, message: "Invalid Format of BookId" })
        }
        //========================= if reviewid is not of valid format =============================
        if (!mongoose.isValidObjectId(reviewid)) {
            return res.status(400).send({ status: false, message: "Invalid Format of ReviewId" })
        }
        //============================= if body is empty ==========================================
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please provide data to update book review" })
        }
        //================================ if valid query is not made ==============================
        if (!(review || rating || reviewedBy)) {
            return res.status(400).send({ status: false, message: "Please enter Valid body to update review" })
        }

        //================================= if book not found ======================================
        let book = await booksModel.findOne({ _id: bookid }).lean()
        if (!book) {
            return res.status(404).send({ status: false, message: "Sorry! Book Not Found!" })
        }
        if (book.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Book is Deleted. You cannot add/update review" })
        }
        //=========================== if review not found ============================================
        let findreview = await reviewModel.findOne({ _id: reviewid })
        if (!findreview) {
            return res.status(404).send({ status: false, message: "Sorry! No such review found!" })
        }
        if (findreview.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Review is Deleted. You cannot update review" })
        }

        //_____________________________________Validation for Review__________________________________

        if (review) {
            if (!isValid(review)) return res.status(400).send({ status: false, message: "Review is in Invalid Format" })

            req.body.review = review.replace(/\s+/g, ' ')
        }
        let reviews = req.body.review


        //_____________________________Validation to update Rating(Only between 1-5)__________________
        if (rating) {
            if (!(typeof rating == "number")) {
                return res.status(400).send({ status: false, message: "Rating should be a number" })
            }

            if (Number.isInteger(rating)) {
                if (rating < 1 || rating > 5) {
                    return res.status(400).send({ status: false, message: "Rating can only be 1,2,3,4,5" })
                }
            }
            else {
                return res.status(400).send({ status: false, message: "Rating can be only Integer and Whole Number" })
            }
        }

        //___________________________________Validation for reviewedBy_________________________________

        if (reviewedBy) {
            if (!isValid(reviewedBy)) return res.status(400).send({ status: false, message: "Your name is in Invalid Format" })

            req.body.reviewedBy = reviewedBy.replace(/\s+/g, ' ')
        }
        let reviewedBys = req.body.reviewedBy

        //============================== updation of review ============================================

        let updateReview = await reviewModel.findOneAndUpdate({ _id: reviewid }, { review: reviews, rating: rating, reviewedBy: reviewedBys, reviewedAt: new Date() }, { new: true })

        book["reviewsData"] = updateReview

        res.status(200).send({ status: true, message: "BookReview is updated", data: book })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}








//=========================================== delete review ===========================================

const deleteReview = async function (req, res) {
    try {

        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        //============================== if bookid is of invalid format ================================
        if (!mongoose.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid Format of BookId" })
        }
        //================================ if reviewid is of invalid format ========================
        if (!mongoose.isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, message: "Invalid Format of ReviewId" })
        }
        //================================== if book is not found ==========================================
        let book = await booksModel.findOne({ _id: bookId })
        if (!book) {
            return res.status(404).send({ status: false, message: "Sorry! Book Not Found!" })
        }
        if (book.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Book is Deleted. You cannot delete review" })
        }
        //================================ if review is not found ======================================
        let findreview = await reviewModel.findOne({ _id: reviewId })
        if (!findreview) {
            return res.status(404).send({ status: false, message: "Sorry! No such review found!" })
        }
        if (findreview.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Review is Deleted. You cannot delete review" })
        }

        //==================================== delete the review =====================================
        const deletereview = await reviewModel.findOneAndUpdate({ _id: reviewId }, { isDeleted: true, })

        book.reviews -= 1
        await book.save();
        res.status(200).send({ status: true, message: "BookReview is Deleted" })
    }

    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}







module.exports = { createReview, updateReview, deleteReview }
