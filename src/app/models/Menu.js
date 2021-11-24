const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Menu = new Schema({
    id:{ type: Number},//id sản phẩm
    category:{ type: String, maxlength:50 },//nhóm sản phẩm
    name:{ type: String, maxlength:100  },//tên
    image:{ type: String, maxlength:600 },//link hình ảnh
    old_price:{ type: Number},//giá ban đầu
    new_price:{ type: Number},//giá mới 
    rating:{ type: Number },//điểm đánh giá
    num_rating:{ type: Number },
    in_stock:{ type: Number },//
    slug:{ type: String, maxlength:100 },
    description:{ type: String, maxlength:600  }
    
});


    // creatAt: { type:Date, default:Date.now },
    // updateAt: { type:Date, default:Date.now }
module.exports = mongoose.model('menus', Menu);