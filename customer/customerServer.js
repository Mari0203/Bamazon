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
    console.log("                                         ");

    purchase();
  });
}

// Prompt the user to make a purchase
function purchase(action = "") {
  if (action == "init") {
  }

  // Prompt the user to enter Product's item_id to review detail of the product:
  inquirer.prompt({
      type: "input",
      message: "Enter the product's item ID to review detail. [Quit with Ctrl+C]",
      name: "id",
      validate: function(val) {
        return !isNaN(val);
      }
    }).then(function(inventoryRes) {
        connection.query("SELECT * FROM products WHERE item_id=?",[inventoryRes.id],function(err, inventoryRes) {
          if (err) {
            console.log("ERROR: ", err);
          }
          console.log("                                         ");
          console.log(
            "====================",
            "\nPRODUCT DETAIL: ",
            inventoryRes,
            "\n===================="
          );
          console.log("                                         ");
        }
      )

      // Prompt the user the desired purchase count:
      inquirer.prompt({
          type: "input",
          name: "qty",
          id: inventoryRes.id,
          message: "OK, how many would you like to buy? ",
          validate: function(value) {
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function(answer) {
            console.log(answer);
            // purchaseItem(answer.qty);
        //     // Check the item inventory and alert if there's insufficient quantity left. 
        //     if ((inventoryRes[id].stock_quantity - inventoryRes.qty) > 0) {
        //         connection.query("UPDATE products SET stock_quantity='"+(inventoryRes[id].stock_quantity - inventoryRes.qty)+"' WHERE item_id='"+item_id+", function(err, res) {
        //             console.log("Product bought successfully!")");
        //     } else {
        //         console.log("INVALID SELECTION: Not enough inventory available.");
        //     }
        });
    });

  // *** This is the end of the function purchase() ***
}

function purchaseItem(item_id, qty) {
    connection.query("SELECT * FROM products WHERE item_id = " + item_id, function(err, res) {
        if(err) {
            console.log(err);
        }
        // Checking the invetory quantity:
        if (qty <= res[0].stock_quantity) {
            console.log("Great, your item is in stock!");
        } else {
            console.log("I'm sorry, it's currently out of stock...");
        }
    })
}

// ======= PROCESSES / CALLING FUNCTIONS ========
getInventory();

// connection.end();
