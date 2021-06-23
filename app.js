// external dependencies
const express = require('express');
require('dotenv').config();

const wordCounterController = require('./src/controllers/word-count-controller');




const app = express();


app.use(express.json());

// app entry point
app.listen(process.env.PORT, async () => {
    console.log(`server listening at http://localhost:${process.env.PORT}`);

});

app.use('/', wordCounterController);
