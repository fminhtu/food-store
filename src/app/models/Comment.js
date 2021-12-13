const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
    userId: {type: Schema.Types.ObjectId},
    userName:{type:String},
    productId:{type:Number},
    content:{type:String},
    creatAt: { type:Date, default:Date.now },
});

module.exports = mongoose.model('comments', Comment);   