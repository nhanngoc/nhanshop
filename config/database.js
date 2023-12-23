
require('dotenv').config();
const mysql = require("mysql");
const connectDB = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
module.exports = connectDB;