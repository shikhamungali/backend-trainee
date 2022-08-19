const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook = async function (req, res) {
    let book = req.body
    let author = book.author
    let publisher = book.publisher

    let authorid = await authorModel.find().select({ _id: 1 })
    let autID = authorid.map(x => x._id.toString())

    let publisherid = await publisherModel.find().select({ _id: 1 })
    let pubId = publisherid.map(x => x._id.toString())

    if (!(author && publisher)) {
        res.send({ data: "please enter author and publisher" })
    }
    else if (!(autID.includes(author) && pubId.includes(publisher))) {
        res.send({ data: "please enter valid authorid or publisherid" })
    }
    else {
        let bookCreated = await bookModel.create(book)
        res.send({ data: bookCreated })
    }

}

const getBooksData = async function (req, res) {
    let books = await bookModel.find()
    res.send({ data: books })
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author publisher') //mutiple key references
    res.send({ data: specificBook })
}


const updateBooks = async function (req, res) {
    let publish = await publisherModel.find({ name: { $in: ["Penguin Random House", "HarperCollins"] } }).select({ _id: 1 })
    let p2 = publish.map(x => x._id)
    let updatecover = await bookModel.updateMany({ publisher: p2 }, { isHardCover: true }, { new: true })

    let rating = await authorModel.find({ rating: { $gt: 3.5 } }).select({ _id: 1 })
    let r2 = rating.map(x => x._id)
    let updateRating = await bookModel.updateMany({ author: r2 }, { $inc: { price: 10 } }, { new: true })

    res.send({ data: updateRating, updatecover })

}

module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.updateBooks = updateBooks
