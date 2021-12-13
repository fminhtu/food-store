const productsRouter = require('./products');
const sitesRouter = require('./sites');
const usersRouter = require('./users');
const apiRouter = require('../app/api');


function route(app){
app.use('/product',productsRouter);
app.use('/user',usersRouter);
app.use('/api',apiRouter)
app.use('/',sitesRouter);

}

module.exports = route;