const mongoose = require('mongoose')
// const basketProduct=require('./BasketProduct')
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        immutable: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    name:String,
    phone: String,
    email:{
        type:String,
        lowercase:true,
        trim:true
    } ,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)