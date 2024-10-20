require('dotenv').config();

const {mongoose} = require('mongoose');
console.log("Attempting to connect to db")

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to db"))
.catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;