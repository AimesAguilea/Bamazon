require('mysql');

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",

    password: "Ramozepdor1",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected with id: " + connection.threadId);
});