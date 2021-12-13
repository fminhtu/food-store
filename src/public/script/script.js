let searchForm = document.querySelector('.search-form-container');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    cart.classList.remove('active');    
    // loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let cart = document.querySelector('.shopping-cart-container');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
    searchForm.classList.remove('active');
    // loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    // cart.classList.remove('active');    
    // loginForm.classList.remove('active');
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

// $('#comment-form input[type=submit]').on('click',function(event){
//     event.preventDefault();
//     $.post(`/api/products/${$('#product-id').val()}/comments`,{
//         content: $('#content-id').val(),
//     },function(data){
//         const commentTemplate = Handlebars.compile(
//             document.getElementById("comment-template").innerHTML);
//         const commentHtml = commentTemplate(data);
//         $('#comment-list').html(commentHtml);
//     }).fail(function(data) {
//         console.log('failed',data);
//         if(data.status===401){
//             window.location.href =`/sign-in?redirect=${window.location.href}`;
//         }
//     });  
// });