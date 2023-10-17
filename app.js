const express = require('express');
require('dotenv').config();
const UsersRoutes = require('./src/users/users.route');
const AppConfig = require('./utils/config');

const app = express();
const users = new UsersRoutes(app);
const config = new AppConfig(app, process.env.DB_URL);
// config
config.configuration();
// Routes
users.routes();
// Connect to the database
config.Dbconnect()

// Start the server
config.startServer();

module.exports = app;
