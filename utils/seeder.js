// const seeder = require('mongoose-seed');
const mongoose = require('mongoose');
const bc = require('bcryptjs');
const UserModel = require('../src/users/users.model');
require('dotenv').config();

const mongoURI = process.env.DB_URL;

/*
// Connect to MongoDB via Mongoose
seeder.connect(mongoURI, function() {
  console.log(mongoURI); // SCAFF
  // Load Mongoose models
  seeder.loadModels([
    './user.model.js',
  ]);

  // Clear specified collections
  seeder.clearModels(['User'], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function(err, done) {
      if (err) {
        console.log('ERROR - seeder.populateModels:', err.toString()); // SCAFF
      }

      // seeding done
      seeder.disconnect();
    });

  });
});
*/

// Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'User',
    documents: [
      {
        username: 'bosedeg2@gmail.com',
        password: bc.hashSync('user1pwd', 10),
      },
      {
        username: 'nelsoniseru08@gmail.com',
        password: bc.hashSync('user2pwd', 10),
      },
      {
        username: 'user3@gmail.com',
        password: bc.hashSync('user3pwd', 10),
      },
      {
        username: 'user4@gmail.com',
        password: bc.hashSync('user4pwd', 10),
      },
      {
        username: 'user5@gmail.com',
        password: bc.hashSync('user5pwd', 10),
      },
    ],
  },
];

// TODO: abstract to handle more collections dynamically, later
async function seeder(dataArray) {
  // connect to db
  await mongoose.connect(mongoURI);

  for await (const data of dataArray) {
    // collect data for each collection to seed
    // const modelName = data.model;
    const docs = data.documents;

    // drop old data
    await UserModel.deleteMany({});

    // array of docs to be saved
    const toSave = [];

    for (const doc of docs) {
      // create and save new user
      const newUser = UserModel(doc);
      toSave.push(newUser.save());
    }

    // execute save op
    await Promise.all(toSave);
  }
}

seeder(data)
  .then(() => process.exit(0))
  .catch(console.log);
