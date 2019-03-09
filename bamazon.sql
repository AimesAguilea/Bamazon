

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(35),
    department_name VARCHAR(25),
    price DECIMAL(4, 2),
    stock_quantity INT(4),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ('product-6', 'home_appliances', 17.97, 6), ('product-7', 'food/grocery', 3.49, 92), ('product-8', 'electronics', 8.97, 45), ('product-9', 'pets', 11.97, 22), ('product-10', 'home_appliances', 79.98, 14)
