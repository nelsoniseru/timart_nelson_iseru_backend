const express = require('express');
require('dotenv').config();
const UsersRoutes = require('./src/users/users.route');
const OrderRoutes = require('./src/orders/orders.route');
const AppConfig = require('./utils/config');
const User = require("./src/users/users.model")
const Order = require("./src/orders/orders.model")
const app = express();
const user = new UsersRoutes(app);
const order = new OrderRoutes(app)
const config = new AppConfig(app);
const jwt = require("jsonwebtoken")
const schema = require('./utils/schema'); // Import your GraphQL schema

const { graphqlHTTP } = require('express-graphql');
const {
    graphqlForAuth
} = require('./utils/middleware');

// config
config.configuration();
// Routes

user.routes();

order.routes()
app.use(graphqlForAuth);
app.use(
    '/graph',
    graphqlHTTP((req) => {
        return {
            schema,
            context: req.user,
            graphiql: { headerEditorEnabled: true }
        }
    })

);

// Connect to the database
config.Dbconnect().then(async () => {
    // Synchronize all models with the database
    await config.synchronizeAllModelsWithDatabase([User, Order]);
    require("./utils/users-seed")
}).then(()=>{
    require("./utils/orders-seed")
})
    .catch((error) => {
        console.error('Database connection error:', error);
    });


// Start the server
config.startServer();

module.exports = app;


