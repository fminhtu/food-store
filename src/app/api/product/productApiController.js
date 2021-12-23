const productService = require('../../service/productsService');

exports.postComment = async (req,res)=>{
    if(!req.user){
        res.status(401).json({
            message:'Unauthorized'
        });
        return;
    }
    const { productId } = req.params;
    const { content } = req.body;
    const { id : userId} = req.user;
    const { name: userName} = req.user;
    const comment = await productService.postComment(userId,userName,productId,content);
    res.status(200).json(comment);
};

exports.getPagination = async (req,res)=>{
    const { category } = req.params;
    const { page } = req.query;
    const productsWithPagination = await productService.getProductsWithPagination(category,page);
    res.status(200).json(productsWithPagination);
};

exports.getPaginationCmt = async (req,res)=>{
    const { page } = req.query;
    const { slug } = req.query;
    const cmtPagination = await productService.getProductCmtPage(slug,page);
    res.status(200).json(cmtPagination);
};