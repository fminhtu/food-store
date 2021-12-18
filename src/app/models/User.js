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
    role: {type:String},
    status: {type:String},
    activationString: {type:String},
    ban: {type:Boolean}
});


module.exports = mongoose.model('users', User);