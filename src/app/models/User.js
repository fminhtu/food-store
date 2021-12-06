const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name:{ type: String},
    username:{type:String},
    password:{type:String},
    email: {type:String},
    phoneNumber: {type: String},
    dateOfBirth: {type: Date},
    image: {type:String},
    role: {type:String}
});


// creatAt: { type:Date, default:Date.now },
    // updateAt: { type:Date, default:Date.now }
module.exports = mongoose.model('users', User);