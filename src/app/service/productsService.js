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
        return items.slice(start,end);
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
    paginationArrayFilter(pageRequest,numItem,slug,type,order){
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
                    category:slug,
                    type:type,
                    order:order
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
    async getProductCmtPage(slug,pageRequest){
        const detail = await Menu.findOne({slug:slug}).lean();
        const numComment = await Comment.count({productId:detail.id});

        let page = parseInt(pageRequest)||1;   
        let totalPage = Math.floor(numComment/perPage) + 1;
        let start = (page-1)*perPage;
        let end;
        if (page==totalPage){
            end = numComment;
        }
        else{
            end = start + perPage;
        }
        let totalPageCmtArr = [];
        if(numComment<=perPage){
            totalPageCmtArr = null;
        }else{
            for (let i=1;i<=totalPage;i++){
                totalPageCmtArr.push({
                    value : i,
                    isCurrent: page === i,
                    slug: slug
                });
            } 
        }
        const comments = (await Comment.find({productId:detail.id}).sort({creatAt: 'descending'}).lean()).slice(start,end);
        
        const realtiveProducts =(await Menu.find({category:detail.category}).lean()).slice(0,12);
        return {detail,comments,totalPageCmtArr,realtiveProducts};
    }

    async getProductWithComment(slug,pageRequest){
        const detail = await Menu.findOne({slug:slug}).lean();
        const numComment = await Comment.count({});
        let page = parseInt(pageRequest)||1;   
        let totalPage = Math.floor(numComment/perPage) + 1;
        let start = (page-1)*perPage;
        let end;
        if (page==totalPage){
            end = numComment;
        }
        else{
            end = start + perPage;
        }

        let totalPageArr = [];
        if(numComment<=perPage){
            totalPageArr = null;
        }else{
            for (let i=1;i<=totalPage;i++){
                totalPageArr.push({
                    value : i,
                    isCurrent: page === i
                });
            } 
        }
        const comments = await Comment.find({productId:detail.id}).sort({creatAt: 'descending'}).lean();

        return {detail,comments};
    }

    async addCart(username, productId,productName,image, price,quantity){
        const user = await Cart.findOne({username}).lean();
        if(user){
            await Cart.updateOne(
                { username: username}, 
                { $push: { 
                    items:{ productId: productId,
                        productName: productName,
                        image: image,
                        price: price,
                        quantity: quantity }
                }},
            );
        }
        else{
            await Cart.create({
                username: username,
                items: [{
                    productId: productId,
                    productName: productName,
                    image: image,
                    price: price,
                    quantity: quantity
                }
                ]
            });
        }
    }

    async getCart(username){
        return await Cart.find({username: username}).lean();
    }

    async unAuthToAuth(unAuthID,username){
        await Cart.updateOne({
            unAuthID
        },{
            $set: {
                username: username
            }
        });
}


    totalPrice(cart){
        let price = 0;
        for(let i = 0 ; i < cart.length;i++){
            price = price+cart[i].price*cart[i].quantity;
        }
        return price;
    }

    async getProductsWithPagination(category,pageRequest){
        if (category==="all"){
            const count = await Menu.count({});
            const products = await Menu.find({}).lean();
            const item = this.viewItem(pageRequest,count,products);
            const totalPageArr = this.paginationArray(pageRequest,count,"");
            return {item,totalPageArr};
        }
        const count = await Menu.count({category:category});
        const products = await Menu.find({category:category}).lean();
        const item = this.viewItem(pageRequest,count,products);
        const totalPageArr = this.paginationArray(pageRequest,count,"/"+category);
        return {item,totalPageArr};
    }

    async removeItem(username,productId){
        return await Cart.findOneAndUpdate({username: username},
            { $pull: { items: { productId: productId } } },
            { safe: true, multi: false }
        );
    }
    
    async updateQuantity(username,productId,quantity){
        return await Cart.updateOne(
            { username: username,
            "items.productId": productId
            },
            {$set:
            {
                "items.$.quantity": quantity,
            }
            }
            );
    }
}

module.exports = new ProductsService;