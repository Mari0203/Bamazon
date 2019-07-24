// Required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
const {printTable} = require('console-table-printer');

// Conencto to MySQL DB:
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
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
        
        if(err) {
            console.log("ERROR: ", err)
        }

        // console.log("Current Inventory: ", res);
        console.log("-------------------------------------------\n");
        printTable(res);

        purchase();
        // connection.end();
    });
}

// Prompt the user to make a purchase
function purchase() {

    // Prompt the user to enter Product ID to search:
    inquirer.prompt({
        type: "input",
        message: "ENTER PRODUCT ID:",
        name: "id",
        validate: function(val) {
            return !isNaN(val);
        }
    }).then(function(res) {
        connection.query("SELECT * FROM products WHERE item_id=?", [res.id],
        function(err, res){
            if (err) {
                console.log("ERROR: ", err);
            };

        console.log("PRODUCT: ", res);
        
        

        });        
    });
};