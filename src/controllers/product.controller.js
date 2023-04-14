const express = require("express")
const router = express.Router()

const Product = require("../models/product.model")


router.get("/",async(req,res)=>{
    try{
        const products = await Product.find()
        return res.status(200).json({products})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
})

router.post("/",async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        return res.status(201).json({product})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
})

router.delete("/:id",async(req,res)=>{
    const productId = req.params.id
    
    try{
        const product = await Product.findByIdAndDelete(productId)
        return res.status(200).json({product})
    }
    catch(error){
        return res.status(200).json({mesage:error.message})
    }
})

module.exports = router