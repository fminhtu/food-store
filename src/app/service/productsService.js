const { ToArrObject } = require('../../util/mongoose');


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
}

module.exports = new ProductsService;