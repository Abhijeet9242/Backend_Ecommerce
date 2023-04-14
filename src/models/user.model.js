
const monogose = require('mongoose');

const userSchema = new monogose.Schema({
    name: { type: String, required:false},
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            type: monogose.Schema.Types.ObjectId,
            ref: 'Product', required: false
        }
    ],
   },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = monogose.model('User', userSchema);