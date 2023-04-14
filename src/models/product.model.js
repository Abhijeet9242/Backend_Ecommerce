const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{type: String , required:true},
    price: {type: Number , required: true},
    rating: {type:Number, required: true},
    brand : {type: String , required: true},
    image: {type: String, required : true},
    category: {type:String, required: true},
    description : {type: String, required: true}
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("Product",productSchema)