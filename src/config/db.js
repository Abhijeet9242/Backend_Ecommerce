const mongoose = require("mongoose")

const DBLINK = "mongodb://127.0.0.1:27017/Ecommerce2"

module.exports = () =>{
    return mongoose.connect(DBLINK)
}