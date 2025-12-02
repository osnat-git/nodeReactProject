const mongoose = require('mongoose')
const basketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required:true
    },
    productId:{
        type: mongoose.ObjectId,
        ref: 'Product',
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        min:1
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Basket', basketSchema)