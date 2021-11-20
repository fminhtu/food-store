const productsRouter = require('./products');
const sitesRouter = require('./sites');


function route(app){
app.use('/product',productsRouter);
app.use('/',sitesRouter);



// app.get('/product', (req, res) => {
//   res.render('product');
// })

app.get('/detail', (req, res) => {
  res.render('detail');
})


}

module.exports = route;