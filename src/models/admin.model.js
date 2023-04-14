
const monogose = require('mongoose');

const adminSchema = new monogose.Schema({
    name:{type:String,required:false},
    email: { type: String, required: true },
    password: { type: String, required: true },
   },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = monogose.model('Admin', adminSchema);