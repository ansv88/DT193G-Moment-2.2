'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();

const init = async () => {

    // Skapar Hapi‑server
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['http://localhost:5173', 'https://dt193g-moment-3-booklist.onrender.com'] // Tillåt frontend‑applikationen att anropa API:et under utveckling
            }
        }
    });

    // Anslut till MongoDB
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log('Ansluten till MongoDB');
    }).catch(err => {
        console.error('Kunde inte ansluta till MongoDB', err);
    });

    // Registrera routes
    require('./routes/book.route')(server);

    await server.start();
    console.log('Servern körs på %s', server.info.uri);
};

// Fångar oväntade fel
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();