var mysql = require("mysql");
var inquirer = require("inquirer");

// Conencto to MySQL DB:
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Suppon8313",
    database: "bamazon_db" 
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as ID: " + connection.threadId);
    loadDB();
});

// Load products from MySQL
// Recurrsively create a function that would prompt the customer
// to make the purchase with inquirer function.  At the end of the load function,
// call this function

function loadDB() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
}