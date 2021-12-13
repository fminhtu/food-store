module.exports = {
    ToArrObject: function (mongoose){
        return mongoose.map(mongoose => mongoose.toObject());
    },
    ToObject : function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
};