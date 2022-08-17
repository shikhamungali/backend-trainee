const BookModel = require("../models/bookModel");
const AuthorModel = require("../models/authorModel");
const { eventNames } = require("../models/bookModel");


const createBook = async function (req, res) {
    let book = req.body;
    let savedBook = await BookModel.create(book);
    res.send({ msg: savedBook });
};

const getNewBook = async function (req, res) {
    let allBooks = await BookModel.find();
    res.send({ msg: allBooks });
};

////List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )


const booksByChetan = async function(req,res){
    let ChetanBooks = await AuthorModel.find({ author_name: "Chetan Bhagat" })
    let a = ChetanBooks[0].author_id
    let BookList = await BookModel.find({ author_id :a})
    res.send({msg:BookList})
}

///ind the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)

const TwoStates = async function(req,res){
    let books = await BookModel.findOneAndUpdate(
        { name: "Two States" },
      {$set:{price:100}},
      {new:true}  
    )
    let a = books.price
    let b = books.author_id
    let authorName = await AuthorModel.find({author_id:b}) 
    let author_name = authorName[0].author_name
    res.send({msg:{author_name,a}})
}


////Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
const CostOfBook = async function(req,res){
    let range = await BookModel.find({ price: { $gte: 50, $lte: 100 }})
    let authors = [];
    for (let i = 0; i < range.length; i++) {
        let arr = await AuthorModel.find({ author_id: range[i].author_id });
        authors.push(arr);
    }
    let obj = {};
    for (let i = 0; i < range.length; i++) {
        obj[range[i].name] = authors[i][0].author_name;
    }
    res.send({ msg: obj });

}

module.exports.createBook = createBook;
module.exports.getNewBook = getNewBook;
module.exports.booksByChetan = booksByChetan;
module.exports.TwoStates = TwoStates;
module.exports.CostOfBook = CostOfBook;
