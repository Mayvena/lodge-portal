const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./router.js');
const config = require('dotenv').config().parsed;

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

// const whitelist = [
//     'http://192.168.0.111:3000', 
//     'http://192.168.0.111:1234',
//     'http://127.0.0.1:3000', 
//     'http://127.0.0.1:1234', 
//     'http://localhost:3000',
//     'http://localhost:1234',
//     'https://192.168.0.111:3000', 
//     'https://192.168.0.111:1234',
//     'https://127.0.0.1:3000', 
//     'https://127.0.0.1:1234', 
//     'https://localhost:3000',
//     'https://localhost:1234'
// ];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1){
//             console.log('whitelist.indexOf(origin) !== -1');
//             callback(null, true);
//         } else {
//             console.log('whitelist.indexOf(origin) === -1')
//             callback(new Error('Not allowed by CORS!'));
//         }
//     },
//     optionsSuccessStatus: 200,
//     withCredentials: false
// }
app.use(cors(true));

app.use('/api', indexRouter);


// Handling errors:

app.use((err,req,res,next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.listen(config.PORT,() => {
    console.log('Server is running on port: ' + config.PORT);
    // console.log('CORS options:');
    // console.log(corsOptions);
});