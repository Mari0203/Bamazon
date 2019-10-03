// Required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
// const { Table } = require("console-table-printer");

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
  console.log("*** Welcome to The Bamazon Store ***");
  console.log("      ");
  //   getInventory();
});

// ======= FUNCTIONS ==============

// Display current inventory from bamazon_db onto the console
function getInventory() {
  connection.query("SELECT * FROM products", function(err, inventoryRes) {
    if (err) {
      console.log("ERROR: ", err);
    }

    console.log("CURRENT INVENTORY: ");
    printTable(inventoryRes);
    console.log("");

    purchase();
  });
}

// Prompt the user to make a purchase
function purchase(action = "") {
  if (action == "init") {
  }

  // Prompt the user to enter Product's item_id to review detail of the product:
  inquirer.prompt([
      {
        name: "ID",
        type: "input",
        message:
          "Enter the product's item ID to review detail. [Quit with Ctrl+C]",
        filter: Number,
        validate: function(val) {
          return !isNaN(val);
        }
      },
      {
        name: "qty",
        type: "input",
        message: "OK, how many would you like to buy? ",
        filter: Number,
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]).then(function(userInput) {
        connection.query("SELECT * FROM products WHERE item_id=?", [userInput.ID], function(err, inventoryRes) {
          if (err) {
            console.log("ERROR: ", err);
          }
          console.log("");
          console.log(
            "====================",
            "\nPRODUCT DETAIL: ",
            inventoryRes,
            "\n===================="
          );
          console.log("");
          purchaseItem(userInput.ID, userInput.qty);
        });
    });
  // *** This is the end of the function purchase() ***
};

function purchaseItem(ID, qty) {
  connection.query("SELECT * FROM products WHERE item_id = " + ID, function(err, res) {
    if (err) {
      console.log(err);
    }
    // Checking the inventory quantity:
    if (qty <= res[0].stock_quantity) {
      var totalCost = res[0].price * qty;

      console.log("Great, your item is in stock!");
      console.log("");
      console.log("Your total cost is $: " + totalCost + ". Thank you for your purchase!");
      console.log("");
      console.log("====================");
      console.log("");

      // Update the database
      connection.query("UPDATE products SET stock_quantity = stock_quantity - " + qty + "WHERE item_id = " + ID);
    } 
    else {
        console.log("I'm sorry, " + res[0].product_name + " is currently out of stock...");
    }

    // Ask the user to exit the app
    inquirer.prompt([{
        name: "exit",
        type: "input",
        message: "Would you like to exit? (Y - to exit)"
    }]).then(function(userInput) {
        if (userInput.exit === "Y") {
            exit();
        } else 
            getInventory();
    });
  });
};

// Exit function the quits the app and ends the database connection:
function exit() {
    console.log("\nTHANK YOU FOR STOPPING BY THE STORE. GOOD BYE!");
    connection.end();
};


// ======= PROCESSES / CALLING FUNCTIONS ========
getInventory();
