const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Menu = new Schema({

    category:{ type: String, maxlength:600 },
    discription:{ type: String, maxlength:600  },
    name:{ type: String, maxlength:600  },
    new_price:{ type: Number},
    old_price:{ type: Number},
    rating:{ type: Number },
    in_stock:{ type: Number },
    image:{ type: String, maxlength:600 },
    num_rating:{ type: Number },
    slug:{ type: String, maxlength:600 },
    
    creatAt: { type:Date, default:Date.now },
    updateAt: { type:Date, default:Date.now }

});

module.exports = mongoose.model('menus', Menu);