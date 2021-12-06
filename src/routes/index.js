const productsRouter = require('./products');
const sitesRouter = require('./sites');
const usersRouter = require('./users');


function route(app){
app.use('/product',productsRouter);
app.use('/user',usersRouter);
app.use('/',sitesRouter);



// app.get('/product', (req, res) => {
//   res.render('product');
// })




}

module.exports = route;