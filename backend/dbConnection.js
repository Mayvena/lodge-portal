require('dotenv').config()

var mysql = require('mysql');
var conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

conn.getConnection(function(err){
    if (err) throw err;
    console.log('Database connection established')
});

module.exports = conn;