const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    username: {type: String},
    fullname: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    address: {type: String},
    date: {type:Date},
    status: {type: String},
    items:[{
        productId: {type: Schema.Types.ObjectId},
        productName:{type:String},
        image:{type:String},
        quantity: { type:Number},
        price: {type: Number}
    }]
});

module.exports = mongoose.model('order', Order);   