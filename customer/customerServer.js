// Required npm packages
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

// Alert if connection is successful:
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as ID: " + connection.threadId);
    viewInventory();
});

// Display current inventory from bamazon_db onto the console
function viewInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        
        if(err) throw err;
        
        console.table("Current Inventory: " + res);
        console.log("-------------------------------------------\n");

        connection.end();
    });
}

// Prompt the user to make a purchase
function purchase() {

    // Prompt the user to select an item and quantity for puchase:
    inquirer.prompt([
        {
            
        }
    ])
}