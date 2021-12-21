const mongoose = require('mongoose');


async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_KEY);
        
        console.log("connect successfully!");
    } catch (error) {
        console.log("connect failue!");
    }
}

module.exports = {connect};