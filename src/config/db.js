const mongoose = require("mongoose")
require('dotenv').config();
const DBLINK = process.env.DBLINK

// const DBLINK = "mongodb://127.0.0.1:27017/Ecommerce2"
// const DBLINK = "mongodb+srv://abhijeet:abhijeet9242@cluster0.jeqho.mongodb.net/Ecommerce2"

module.exports = () =>{
    return mongoose.connect(DBLINK)
}