'use strict';

const express = require ('express');
const app = express();
const cors = require('cors');
const notFound = require('../401-whiteboard-backend/error-handlers.js/404');
const errorHandler = require('../401-whiteboard-backend/error-handlers.js/500');
const post = require('../401-whiteboard-backend/routes/post.routes')

app.use(cors());
app.use(post);
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("this is the Home page")
});

app.use(notFound);
app.use(errorHandler);

function start(port) {
    app.listen(port, () => console.log(`Welcome ${port}`));
}

module.exports = {
    start,app
};