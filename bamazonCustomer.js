require('mysql');

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // 3306 is default port for mysql. Changing it wont work.
    port: 3306,
    user: "root",

    password: "Ramozepdor1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected with id: " + connection.threadId);
    itemDisplay();
    // connection.end();
});

var userInp = process.argv.slice(2).join(' ')

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


            function itemInfo() {
                connection.query("SELECT * FROM products WHERE item_id=?", [answers.product_id], function (err, res) {
                    if (err) throw err;
                    for (i = 0; i < res.length; i++) {
                        console.log("Item_ID: " + res[i].item_id + "|" + "Product_Name: " + res[i].product_name + "|" + "Department_Name: " + res[i].department_name + "|" + "Price: " + res[i].price + "|" + "Stock: " + res[i].stock_quantity);
                    }
                    console.log('========================');
                });
            };

            console.log('----------------');
            newOrder.printInfo();
            console.log('----------------');

            console.log(itemInfo());

            function displayCost() {
                connection.query("SELECT * FROM products WHERE item_id=?", [answers.product_id], function (err, res) {
                    if (err) throw err;
                    for (i = 0; i < res.length; i++) {
                        console.log("Total Cost: " + res[i].price * answers.quantity);
                    }
                    console.log('========================');
                    // connection.end();
                });
            };

            console.log(displayCost());

        });

        // connection.end();
    })
}




















// function grabItem() {
//     connection.query("SELECT * FROM products WHERE item_id=?", [userInp], function (err, res) {
//         if (err) throw err;
//         for (i=0;i<res.length;i++) {
//             console.log("Item_ID: " + res[i].item_id + "|" + "Product_Name: " + res[i].product_name + "|" + "Department_Name: " + res[i].department_name + "|" + "Price: " + res[i].price + "|" + "Stock: " + res[i].stock_quantity);
//         }
//         console.log('========================');
//         // connection.end();
//     });
// }