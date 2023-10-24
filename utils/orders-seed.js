const fs = require('fs');
const Order = require("../src/orders/orders.model")
require('dotenv').config();


// Read data from the JSON file
const jsonData = JSON.parse(fs.readFileSync('orders.json', 'utf8'));

// Seed the data into the database
async function seedData() {
    for (const data of jsonData) {

        await Order.create(data);
    }

}

Order.findAll().then(order => {
    if (order.length == 0) {
        seedData().then(() => {
            console.log('Data seeded successfully.');
        }).catch((error) => {
            console.error('Error seeding data:', error);
        });
    }
})
