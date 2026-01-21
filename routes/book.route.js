const bookController = require('../controllers/book.controller');
const Joi = require('joi');

// Gemensam valideringsrespons vid fel
const failAction = (_request, h, err) => {
    return h
        .response({ message: 'Valideringsfel', details: err.details })
        .code(400)
        .takeover();
};

module.exports = (server) => {
    server.route([
        {
            method: 'GET',
            path: '/books/{id}',
            handler: bookController.getBookById,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    failAction
                }
            }
        },
        {
            method: 'GET',
            path: '/books',
            handler: bookController.getAllBooks,
            options: {
                validate: {
                    query: Joi.object({
                        title: Joi.string().min(1).max(50),
                        author: Joi.string().min(1).max(50)
                    }),
                    failAction
                }
            }
        },
        {
            method: 'POST',
            path: '/books',
            handler: bookController.addBook,
            options: {
                validate: {
                    payload: Joi.object({
                        title: Joi.string().min(1).max(50).required(),
                        author: Joi.string().min(1).max(50).required(),
                        datePublished: Joi.number().required(),
                        read: Joi.boolean().required()
                    }),
                    failAction
                }
            },
        },
        {
            method: 'PUT',
            path: '/books/{id}',
            handler: bookController.updateBook,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        title: Joi.string().min(1).max(50),
                        author: Joi.string().min(1).max(50),
                        datePublished: Joi.number(),
                        read: Joi.boolean()
                    }).min(1),
                    failAction
                }
            },
        },
        {
            method: 'DELETE',
            path: '/books/{id}',
            handler: bookController.deleteBook,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    failAction
                }
            },
        }
    ])
}