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