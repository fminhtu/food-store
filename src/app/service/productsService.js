const { ToArrObject } = require('../../util/mongoose');
const Comment = require('../models/Comment');
const Menu = require('../models/Menu');
const Cart = require('../models/Cart');


const perPage = 12;
class ProductsService{
    viewItem(pageRequest,numItem,items){
        let page = parseInt(pageRequest)||1;
            
        let totalPage = Math.floor(numItem/perPage) + 1;
        let start = (page-1)*perPage;
        let end;
        if (page==totalPage){
            end = numItem;
        }
        else{
            end = start + perPage;
        }
        return ToArrObject(items).slice(start,end);
    }
    paginationArray(pageRequest,numItem,slug){
        if(numItem<=perPage){
            return null;
        }
        let page = parseInt(pageRequest)||1;
        let totalPage = Math.floor(numItem/perPage) + 1;
        let totalPageArr = [];
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i,
                    category:slug
                });
            } 
        return totalPageArr;    
    }
    postComment(userId,userName,productId,content){
        return new Comment(
            {
                userId: userId,
                userName:userName,
                productId: productId,
                content: content,
                createAt: new Date()
            }
        ).save();
    }
    async getProductWithComment(slug){
        const detail = await Menu.findOne({slug:slug}).lean();
        const comments = await Comment.find({productId:detail.id}).lean();
        return {detail,comments};
    }

    addCart(userId, productId,productName,image, price,quantity){
        return new Cart(
            {
                userId: userId,
                productId: productId,
                productName: productName,
                image: image,
                price: price,
                quantity: quantity
            }
        ).save();
    }

    async getCart(userId){
        return await Cart.find({userId: userId}).lean();
    }

    totalPrice(cart){
        let price = 0;
        for(let i = 0 ; i < cart.length;i++){
            price = price+cart[i].price*cart[i].quantity;
        }
        return price;
    }
}

module.exports = new ProductsService;