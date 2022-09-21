const reviewModel = require("../models/reviewModel")
const booksModel = require("../models/booksModel")
const { isValidDate } = require("../validation/validator");
const mongoose = require('mongoose')




const stringRegex = /^[ a-z ]+$/i
const isbn10 = /^(?=(?:\D*\d){7}(?:(?:\D*\d){3})?$)[\d-]+$/
const isbn13 = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/


//====================================== creating books ===================================================
const createBooks = async function (req, res) {
    try {
        let requestBody = req.body;
        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = requestBody
        //========================= if body data is not present =======================================
        if (Object.keys(requestBody).length == 0)
            return res.status(400).send({ status: false, message: "Body can't be empty! Please Provide Data" })
        //========================== title is mandatory ====================================
        if (!title) {
            return res.status(400).send({ status: false, message: "Title is required" })
        };
        //============================ excerpt is mandatory =========================================
        if (!excerpt) {
            return res.status(400).send({ status: false, message: "excerpt is required" })
        };
        //================================= userId is mandatory =====================================
        if (!userId) {
            return res.status(400).send({ status: false, message: "userId is required" })
        };

        //=============================== invalid format of userId =================================
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: "invalid userId format" });
        }
        //=============================== if userId is not found ======================================
        let checkuserId = await booksModel.findOne({ userId: userId })
        if (!checkuserId) {
            return res.status(400).send({ status: false, message: "userId not found" })
        }
        //========================= if the user is authorised to create data =======================
        if (userId != req.token) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access ! User's credentials do not match."
            })
        }
        //======================== ISBN is mandatory ===========================================
        if (!ISBN) {
            return res.status(400).send({ status: false, message: "ISBN is required" })
        };
        //======================== invalid format of ISBN =======================================
        if (!ISBN.match(isbn10) && !ISBN.match(isbn13)) {
            return res.status(400).send({ status: false, message: "Please provide correct format for ISBN" })
        };
        //=================================== category is mandatory ==============================
        if (!category) {
            return res.status(400).send({ status: false, message: "category is required" })
        };

        if (!category.match(stringRegex)) {
            return res.status(400).send({ status: false, message: "category cannot contain numbers" })
        };
        //=============================== subcategory is mandatory =============================
        if (!subcategory) {
            return res.status(400).send({ status: false, message: "subcategory is required" })
        };
        if (typeof subcategory != "object" && typeof subcategory != "string") {
            return res.status(400).send({ status: false, message: "subcategory is in wrong format" })
        };
        //============================ releasedAt is mandatory ====================================
        if (!releasedAt) {
            return res.status(400).send({ status: false, message: "releasedAt is required" })
        };

        if (!isValidDate(releasedAt)) {
            return res.status(400).send({ status: false, message: "releasedAt is in incorrect format (YYYY-MM-DD)" })
        }
        //============================== if title already exist =====================================
        let checkTitle = await booksModel.findOne({ title: title })
        if (checkTitle) {
            return res.status(400).send({ status: false, message: "Title already used" })
        }
        //================================ if ISBN already exist =====================================
        let checkISBN = await booksModel.findOne({ ISBN: ISBN })
        if (checkISBN) {
            return res.status(400).send({ status: false, message: "ISBN already used" })
        }
        //============================== createing books ============================================
        const newBook = await booksModel.create(requestBody);
        return res.status(201).send({ status: true, message: "Book created successfully", data: newBook })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




//=================================== geting books data using query params ==================================
const getBooks = async function (req, res) {
    try {
        const queryParams = req.query
        //========================== if query are not entered ==========================================
        if (!queryParams) {
            return res.status(400).send({ status: false, message: "enter query to get data" })
        }
        //================================== if userId is of invalid format =============================
        if (!mongoose.Types.ObjectId.isValid(queryParams.userId)) {
            return res.status(400).send({ status: false, msg: "invalid userId format" });
        }
        //=============================== finding books in DB ========================================
        const books = await booksModel.find({ ...queryParams, isDeleted: false }).sort({ title: 1 }).select('_id title excerpt userId category releasedAt reviews')
        books.sort((a, b) => a.title.localeCompare(b.title))

        if (books && books.length == 0) {
            return res.status(404).send({ status: false, message: "Books not found" })
        }
        return res.status(200).send({ status: true, message: "Books list", data: books })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}



module.exports = { createBooks, getBooks }