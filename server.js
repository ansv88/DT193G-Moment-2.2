'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
require('dotenv').config();

const init = async () => {

    // Skapar Hapi‑server
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
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