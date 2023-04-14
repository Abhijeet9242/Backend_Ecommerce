const express = require("express")
const app = express()
const cors = require("cors")

const productController = require("./controllers/product.controller")
const userController = require("./controllers/user.controller")
const adminController = require("./controllers/admin.controller")


app.use(express.json())
app.use(cors())

app.use("/products",productController)
app.use("/user",userController)
app.use("/admin",adminController)



// app.get("/",(req,res)=>{
//    res.send("hii")
// })




module.exports = app;