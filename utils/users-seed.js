const fs = require('fs');
const User = require("../src/users/users.model")
require('dotenv').config();
// Create a Sequelize instance

// Read data from the JSON file
const jsonData = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Seed the data into the database
async function seedData() {
  for (const data of jsonData) {

    await User.create(data);
  }
  }

User.findAll().then(user=>{
  if(user.length == 0){
    seedData().then(() => {
      console.log('Data seeded successfully.');
    }).catch((error) => {
      console.error('Error seeding data:', error);
    });
    }
})
