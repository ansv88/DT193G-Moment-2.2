const mongoose = require('mongoose');

// Mongoose‑schema för Book
const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    datePublished: Number,
    read: Boolean
});

// Mongoose‑model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;