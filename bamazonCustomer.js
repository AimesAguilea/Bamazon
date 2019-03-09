require('mysql');

var mysql = require("mysql");
var config = require('./config.js');
var inquirer = require("inquirer");

var connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected with id: " + connection.threadId);

});



function itemDisplay() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("\nItem_ID: " + res[i].item_id + "\nName: " + res[i].product_name + "\n" + "Price: " + res[i].price)
        }
        console.log('\n-------------------------------\n');

        promptUser();
    }
    )
};






function promptUser() {

    inquirer.prompt([{
        type: 'input',
        name: 'item_id',
        message: 'Enter the ID for the item you would like to purchase.'
    
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you want?'

    }

    ]).then(function (input) {

        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, {
            item_id: item
        }, function (err, data) {
            if (err) throw err;


            if (data.length === 0) {
                console.log(("\n Error: select ID\n"));
                itemDisplay();
            } else {
                var itemData = data[0];

                if (quantity <= itemData.stock_quantity) {
                    console.log(('\n Item is in stock!!!\n'));

                    var newQueryStr = 'UPDATE products SET stock_quantity = ' + (itemData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(newQueryStr, function (err, data) {
                        if (err) throw err;


                        console.log((' Your total is $' + itemData.price * quantity));
                        console.log(("\n---------------------------------------------------------------------\n"));

                        connection.end()

                    });

                } else {
                    console.log(('\n Sorry, there is not enough in stock.\n'));
                    console.log(("\n---------------------------------------------------------------------\n"));

                    itemDisplay();
                }
            }

        }

        )


    })


}

itemDisplay();