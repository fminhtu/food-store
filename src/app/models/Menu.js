const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Menu = new Schema({
    id:{ type: Number},
    category:{ type: String, maxlength:50 },
    name:{ type: String, maxlength:100  },
    image:{ type: String, maxlength:600 },
    old_price:{ type: Number},
    new_price:{ type: Number},
    rating:{ type: Number },
    in_stock:{ type: Number },
    num_rating:{ type: Number },
    slug:{ type: String, maxlength:100 },
    description:{ type: String, maxlength:600  },
    creatAt: { type:Date, default:Date.now },
    updateAt: { type:Date, default:Date.now }
    
});


// creatAt: { type:Date, default:Date.now },
    // updateAt: { type:Date, default:Date.now }
module.exports = mongoose.model('menus', Menu);