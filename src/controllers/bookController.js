const BookModel = require("../models/bookModel");


//========================================= create new entries to the database=============================================
const createBook = async function (req, res) {
    let book = req.body;
    let savedBook = await BookModel.create(book);
    res.send({ msg: savedBook });
};


///================================================= get the list of all the books ========================================
const getNewBook = async function (req, res) {
    let allBooks = await BookModel.find();
    res.send({ msg: allBooks });
};


///==================================== get the list of books with particular keys only ============================================///
const bookList = async function (req, res) {
    let allBooks = await BookModel.find().select({
        bookName: 1,
        authorName: 1,
        _id: 0,
    });
    res.send({ msg: allBooks });
};

////================================= get data with particluar year ====================================================
const getBooksInYear = async function (req, res) {
    let bookYear = req.body;
    let savedBooks = await BookModel.find({ year: bookYear.year })
    res.send({ msg: savedBooks });
};


////================================================= get particular books when user enters some input ================================
const getParticularBooks = async function (req, res) {
    let condition = req.body;
    let particularBooks = await BookModel.find(condition)
    res.send({ msg: particularBooks });
};


///==================================== returns books with different INR prices ====================================================

const getXINRBooks = async function (req, res) {

    let INRBooks = await BookModel.find({ 'price.indianPrice': { $in:["100 INR", "200 INR", "500 INR"]} });

    res.send({ msg: INRBooks });
};


///=========================================== books that are available in stock or have more than 500 pages =============================
const getRandomBooks = async function (req, res) {

    let randomBooks = await BookModel.find({ $or: [{ stockAvailable: true }, { totalPages: { $gt: 500 } }] });

    res.send({ msg: randomBooks });
};

////================================= exports the modules by making them public ==========================================================
module.exports.createBook = createBook;
module.exports.getNewBook = getNewBook;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;