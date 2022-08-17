const AuthorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
    let newAuthor = req.body;
    let savedAuthor = await AuthorModel.create(newAuthor);
    res.send({ msg: savedAuthor });
};

const getAuthor = async function (req, res) {
    let allAuthors = await AuthorModel.find()
    res.send({ msg: allAuthors })
}

module.exports.createAuthor = createAuthor;
module.exports.getAuthor = getAuthor;