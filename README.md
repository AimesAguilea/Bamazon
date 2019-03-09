# Bamazon

## Overview: 

Bamazon is a node app that's designed to display 'products' to the user, who then choose via prompts a product by id and how many they would like. The user is then given their total for the purchase, and a mySQL database attached to the products will update the stock for that item.

## Node packages used:

mysql

inquirer

## How the app works:

### The user types into the command line:

_**node bamazonCustomer**_ 

This displays 10 items to the user all with names and prices. The user is prompted to pick an item based on that items specific id. Then, a prompt for the quantity they would like.

If the user enters an id thats not valid, and error will occur. There will also be a notificaion if there is not enough in stock.

After a quantity is entered, a total amount for the purchase will be displayed. A database will also be updated with the new stock info for that item.




![Image of Yaktocat](https://github.com/AimesAguilea/Bamazon/screenshots/startUp.jpg)
