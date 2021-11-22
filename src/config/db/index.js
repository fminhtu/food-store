const mongoose = require('mongoose');


async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/drink');
        //await mongoose.connect('mongodb+srv://mongo:mongo@cluster0.n1nhc.mongodb.net/food_websiteDB?retryWrites=true&w=majority');
        console.log("connect successfully!");
    } catch (error) {
        console.log("connect failue!");
    }
}

module.exports = {connect};