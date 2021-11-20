const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Menu = new Schema({
    category:{ type: String, maxlength:600 },
    discription:{ type: String, maxlength:600  },
    name:{ type: String, maxlength:600  },
    new_price:{ type: String, maxlength:600 },
    old_price:{ type: String, maxlength:600 },
    rating:{ type: String, maxlength:600 },
    remain:{ type: String, maxlength:600 },
    image:{ type: String, maxlength:600 },
    num_rating:{ type: String, maxlength:600 },
    creatAt: { type:Date, default:Date.now },
    updateAt: { type:Date, default:Date.now }

});

module.exports = mongoose.model('menus', Menu);