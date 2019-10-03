ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Suppon8313';

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE table products(
    item_id INT not null auto_increment,
    product_name VARCHAR(100) not null,
    department_name varchar(50) not null,
    price DECIMAL(10, 2) DEFAULT 0,
    stock_quantity INT not null,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Earbuds", "Electronics", 49.95, 150),
  ("Halo", "Video Games", 59.99, 200),
  ("Chicago Style Hot Dog Kit 16pk", "Food and Drink", 41.95, 50),
  ("Jogger Pants", "Apparel", 34.99, 10),
  ("Formal Evening Dress", "Apparel", 159.00, 20),
  ("First Aid Survival Kit", "Necessities", 38.99, 30),
  ("Inception DVD Blu-ray", "Films", 24.99, 10),
  ("Mad Max: Fury Road DVD", "Films", 15.00, 42),
  ("Diapers 74 ct", "Baby Products", 26.99, 2),
  ("Curved Ultrawide LED Monitor 35inch", "Electronics", 549.99, 5);