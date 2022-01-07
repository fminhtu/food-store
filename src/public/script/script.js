let searchForm = document.querySelector('.search-form-container');
let cart = document.querySelector('.shopping-cart-container');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    cart.classList.remove('active');    
}


document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');    
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}

$('#comment-form input[type=submit]').on('click',function(event){
    event.preventDefault();
    
    $.post(`/api/products/${$('#product-id').val()}/comments`,{
        content: $('#content-id').val(),
    },function(data){
        const commentTemplate = Handlebars.compile(
            document.getElementById("comment-template").innerHTML);
        const commentHtml = commentTemplate(data);
        $('#comment-list').prepend(commentHtml);
    }).fail(function(data) {
        console.log('failed',data);
        if(data.status===401){
            window.location.href =`/sign-in?redirect=${window.location.href}`;
        }
    });  
});




$(document).on('click','#paginationCmt-id a .pageCmt',function(event){
    event.preventDefault();
    let page = $(this).find('input.pageInput').val();
    let slug = $(this).find('input.productSlug').val();
    console.log(slug);
    $.get(`/api/products/detail/pagination`,{
        page: page,
        slug: slug,
    },function(data){
        console.log(data);
        const commentTemplate = Handlebars.compile(
        document.getElementById("comment-template-page").innerHTML);
        const commentHtml = commentTemplate(data);
        $('#paginationCMT').html(commentHtml);
    })  
});


$(document).on('click','#productsWithPagination-id #pagination-id a #form-submit',function(event){
    event.preventDefault();
    
    let category = $(this).find('input.categoryInput').val();
    if (category==="/"){
        category="/all";
    }

    $.get(`/api/products${category}`,{
        page: $(this).find('input.pageInput').val(),
    },function(data){
        const commentTemplate = Handlebars.compile(
        document.getElementById("category-template").innerHTML);
        const commentHtml = commentTemplate(data);
        $('#productsWithPagination-id').html(commentHtml);
    })  
});