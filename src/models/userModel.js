const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        unique: true,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: ["Fantasy", "Dystopian", "Romance", "Science Fiction","Historical","Fiction"],
    year:{
        type: Number,
        required: true
    }

}, { timestamps: true });


     ///////create a model from bookSchema with a name books in the database////////

module.exports = mongoose.model('Book', bookSchema) //books

