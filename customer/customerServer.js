// Required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
const { printTable } = require("console-table-printer");

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
  console.log("");
  console.log("*** Welcome to The Bamazon Store ***");
  console.log("");
  
  getInventory();
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
        connection.query("SELECT * FROM products WHERE item_id = ?", [userInput.ID], function(err, inventoryRes) {
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
      var totalCost = Math.round(res[0].price * qty).toFixed(2);

      console.log("Great, your item is in stock!");
      console.log("");
      console.log("Your total cost is $ " + totalCost + ". Thank you for your purchase!");
      console.log("");
      console.log("====================");
      console.log("");

      // Update the database
      connection.query("UPDATE products SET stock_quantity = stock_quantity - " + qty + " WHERE item_id = " + ID);
    } 
    else {
        console.log(
          "INVALID SELECTION: We don't have " + res[0].product_name + " in the quantity, " + res[0].qty + " selected.",
          "\nPlease make another selection."
          );
    }

    // Ask the user to either continue shopping or exit the app
    inquirer.prompt([
        {
        type: "list",
        name: "action",
        message: "Please select what would you like to do next.",
        choices: [ "View Items for Sale", "Leave the Store" ],
        }
    ]).then(function(userSelection) {
        if (userSelection.action === "View Items for Sale") {
          getInventory();

        } else if (userSelection.action === "Leave the Store") {
          exit();
        }
    });
  });
};

// Exit function the quits the app and ends the database connection:
function exit() {
    console.log(
      "\nTHANK YOU FOR STOPPING BY THE STORE.",
      "\nGOOD BYE!",
      "\n--------------------"
      );

    connection.end();
};


// ======= PROCESSES / CALLING FUNCTIONS ========
// getInventory();
