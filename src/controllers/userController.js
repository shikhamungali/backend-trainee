const BookModel= require("../models/userModel")

/////////================ function to create entries of books in database =========================/////////////
const createBooksData = async function (req, res) {
    let data = req.body
    let savedData = await BookModel.create(data)
    res.send({msg: savedData})
}

/////////======================== function to get the list of all books =========================////////////

const getBooksData = async function (req, res) {
    let allBooks = await BookModel.find()
    res.send({msg: allBooks})
}

module.exports.createBooksData = createBooksData
module.exports.getBooksData = getBooksData