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
    console.log(
        "----------------------------------------",
        "\nConnection to database successful!",
        "\nYou are connected as ID# " + connection.threadId,
        "\n----------------------------------------"
        );
    viewInventory();
});

// Display current inventory from bamazon_db onto the console
function viewInventory() {
    connection.query("SELECT * FROM products", function(err, inventoryRes) {
        
        if(err) {
            console.log("ERROR: ", err)
        }

        console.log("CURRENT INVENTORY: ");
        console.log("                                         ");
        printTable(inventoryRes);

        // Adding empty space/line break between prompts
        console.log("                                         ");

        purchase();
        // connection.end();
    });
}

// Prompt the user to make a purchase
function purchase() {

    // Prompt the user to enter Product's item_id to review detail of the product:
    inquirer.prompt({
        type: "input",
        message: "Enter the product's item ID to review detail. [Quit with Ctrl+C]",
        name: "id",
        validate: function(val) {
            return !isNaN(val);
        }
    }).then(function(inventoryRes) {
        connection.query("SELECT * FROM products WHERE item_id=?", [inventoryRes.id], function(err, inventoryRes){
            if (err) {
                console.log("ERROR: ", err);
            };
            console.log("                                         ");
            console.log(
                "====================",
                "\nPRODUCT DETAIL: ", 
                inventoryRes, 
                "\n====================");
            console.log("                                         ");
        });    
    });        
};