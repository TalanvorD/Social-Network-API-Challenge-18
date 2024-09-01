const express = require('express'); // Express server
const db = require('./config/connection'); // MongoDB connection
const routes = require('./routes'); // Importing routes

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for Social-Network-API-Challenge-18 running on port ${PORT}!`);
  });
});