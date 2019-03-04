require('mysql');

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    // 3306 is default port for mysql. Changing it wont work.
    port: 3306,
    user: "root",

    password: "Ramozepdor1",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected with id: " + connection.threadId);
    // grabItem();
    itemDisplay();
    // connection.end();
});

var userInp = process.argv.slice(2).join(' ')


function itemDisplay() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for(i=0;i<res.length;i++) {
            console.log("\nItem_ID: " + res[i].item_id + "\nName: " + res[i].product_name + "\n" + "Price: " + res[i].price)
        }
        console.log('------------------');
        connection.end();
    })
}




















function grabItem() {
    connection.query("SELECT * FROM products WHERE item_id=?", [userInp], function (err, res) {
        if (err) throw err;
        for (i=0;i<res.length;i++) {
            console.log("Item_ID: " + res[i].item_id + "|" + "Product_Name: " + res[i].product_name + "|" + "Department_Name: " + res[i].department_name + "|" + "Price: " + res[i].price + "|" + "Stock: " + res[i].stock_quantity);
        }
        console.log('========================');
        connection.end();
    });
}