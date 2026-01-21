const Book = require('../models/book.model');

// GET /books/{id}
exports.getBookById = async (request, h) => {
    try {
        const id = request.params.id;
        const book = await Book.findById(id);
        if (!book) return h.response({ message: 'Boken hittades inte' }).code(404);
        return book;
    } catch (error) {
        return h.response({ message: 'Serverfel', error }).code(500);
    }
}

// GET /books
exports.getAllBooks = async (request, h) => {
    try {
        const { title, author } = request.query;
        const filter = {};

        if (title) filter.title = { $regex: title, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };

        return await Book.find(filter);
    } catch (error) {
        return h.response({ message: 'Serverfel', error }).code(500);
    }
}

// POST /books
exports.addBook = async (request, h) => {
    try {
        const book = new Book(request.payload);
        const saved = await book.save();
        return h.response(saved).code(201);
    } catch (error) {
        return h.response({ message: 'Serverfel', error }).code(500);
    }
}

// PUT /books/{id}
exports.updateBook = async (request, h) => {
    try {
        const id = request.params.id;
        const update = request.payload;
        const book = await Book.findByIdAndUpdate(id, update, { new: true });
        if (!book) return h.response({ message: 'Boken hittades inte' }).code(404);
        return book;
    } catch (error) {
        return h.response({ message: 'Serverfel', error }).code(500);
    }
}

// DELETE /books/{id}
exports.deleteBook = async (request, h) => {
    try {
        const id = request.params.id;
        const book = await Book.findByIdAndDelete(id);
        if (!book) return h.response({ message: 'Boken hittades inte' }).code(404);
        return book;
    } catch (error) {
        return h.response({ message: 'Serverfel', error }).code(500);
    }
}
