const mongoose = require('mongoose');


async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/food_websiteDB');
        console.log("connect successfully!");
    } catch (error) {
        console.log("connect failue!");
    }
}

module.exports = {connect};