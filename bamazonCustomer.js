require('mysql');

var mysql = require("mysql");
var config = require('./config.js');
var inquirer = require("inquirer");

var connection = mysql.createConnection(config);


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected with id: " + connection.threadId);
    itemDisplay();
    // connection.end();
});


function Order(product_id, quantity) {
    this.product_id = product_id;
    this.quantity = quantity;
}
Order.prototype.printInfo = function () {
    console.log("This is the id: " + this.product_id + "\nQuantity: " + this.quantity);
};

function itemDisplay() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("\nItem_ID: " + res[i].item_id + "\nName: " + res[i].product_name + "\n" + "Price: " + res[i].price)
        }
        console.log('------------------');

        inquirer.prompt([
            {
                name: "product_id",
                message: "What is the product_id of the item you would like to buy?"
            }, {
                name: "quantity",
                message: "How many would you like to buy?"
            }
        ]).then(function (answers) {
            var newOrder = new Order(answers.product_id, answers.quantity);


            //display item info:
            function itemInfo() {
                connection.query("SELECT * FROM products WHERE item_id=?", [answers.product_id], function (err, res) {
                    if (err) throw err;
                    for (i = 0; i < res.length; i++) {
                        console.log("Item_ID: " + res[i].item_id + "|" + "Product_Name: " + res[i].product_name + "|" + "Department_Name: " + res[i].department_name + "|" + "Price: " + res[i].price + "|" + "Stock: " + res[i].stock_quantity);
                    }
                    console.log('========================');
                });
            };
            console.log(itemInfo());


            // this prints what the user answered for prompts:
            console.log('----------------');
            newOrder.printInfo();
            console.log('----------------');


            // displays total cost of the purchase to the user:
            function displayCost() {
                connection.query("SELECT * FROM products WHERE item_id=?", [answers.product_id], function (err, res) {
                    if (err) throw err;
                    for (i = 0; i < res.length; i++) {
                        console.log("Total Cost: " + res[i].price * answers.quantity);
                    }
                    console.log('========================');
                });
            };
            console.log(displayCost());




            //=================================================
            // var amountAskedFor = answers.quantity;
            for (i = 0; i < res.length; i++) {
                // var currentStock = res[i].stock_quantity;
                var updatedStock = res[i].stock_quantity-answers.quantity;
            }
            //===================================================



            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++keep!!!!!
            function updateStock() {
                connection.query("UPDATE products SET stock_quantity =? WHERE item_id =?", [updatedStock, answers.product_id], function (err, res) {
                    if (err) throw err;
                    
                    console.log("Updated stock for this item: " + updatedStock);
                    console.log('========================');
                });
                connection.end();
            };
            console.log(updateStock());
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++keep!!!!!


        });

    })
}
