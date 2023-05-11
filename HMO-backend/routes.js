const express = require('express');
const commands = require('./routes/commands').router;

// // for error handling
// const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api', commands);

    // this middleware error function will activate after the routes above, by calling the next() function in the routes
    // app.use(error);
};
