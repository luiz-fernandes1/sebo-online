const mongoose = require('mongoose');

const Book = mongoose.model('Book', new mongoose.Schema({
    bookName: {type: String, required: true},
    bookAuthor: {type: String, required: true},
    bookPublisher: {type: String, required: true},
    bookLanguage: {type: String, required: true},
    bookPrice: {type: Number, required: true},
    bookYear: {type: Number, required: true},
    bookDescription: {type: String, required: true},
    /*bookImage: {data: Buffer, contentType: String},*/
    userId: {type: String, required: true}
}))

module.exports = Book
