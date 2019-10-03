# Bamazon Store with Node.js & MySQL
Basic Amazon-like storefront app that uses Node.js CLI as UI and MySQL database to store product inventory. 

## App Overview
This app uses CLI-based UI for an Amazon-like storefront that pulls data from MySQL database. The app will allow the user (customer) to submit an order which would update the store inventory accordingly.

## App Functionality
The app will show the user/customer the total cost of one's purchase when the order is fulfilled.  It will alert the user/customer if there is insufficient quantity for an item requested, and prevent the order from going through. The app will also track product sales across the store's departments and provides a summary of the highest-grossing departments in the store.

## How App is Organized

  ### User Interface (UI)
  Allows the user/customer to view the current inventory of store items with following information that is stored in a database called, "products" in MySQL:
   * item_id
   * product_name
   * department_name
   * price
   * stock_quantity

  User can make a purchase any of the existing items by entering the item_id and the desired quantity.

  ### MySQL Database
  Bamazon store's inventory is stored in a table, "products" in the MySQL database, called bamazon_db.  As the user makes a purchase, the invetory information is updated.

## Getting Started: How To Use the App
1. From the "customer" folder, run `node customerServer.js` in the CLI/terminal to see the current inventory.
2. When prompted, enter `item_id` to review Product Detail.
3. When prompted, enter a quantity of the product you'd like to purchase.

    * If the item is available for the quantity selected, the app will proceed with calculating the total cost and alert your successful purchase.  This will update the `stock_quantity` in the inventory database.

    * If the item is NOT avaialble the quantity selected, the app will alert the user to make another selection.

4. When purchase transaction is complete, the app will prompt the user with below 2 options for next step:
    * `View Items for Sale` -- will allow the user to continue shopping by showing the updated iventory for the user to make another purchase selection.
    
    * `Leave the Store` -- will quit the app.

## App Demo Files
![Demo video](https://drive.google.com/file/d/1YcP24jg-zeh-LIbiopX5lv2M5Bh0sTZX/view)

## Technologies Used
  * JavaScript
  * Node.js
  * Node packages (npm inquirer, npm mysql)
  * MySQL

 
---

By Mari &copy; 2019
with :v:  &  :green_heart:
