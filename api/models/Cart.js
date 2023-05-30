const mongoose =require('mongoose');
const cartSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId, required:true ,ref:'Place'}, 
    user:{type:mongoose.Schema.Types.ObjectId, required:true },
});

const CartModel=mongoose.model('Cart',cartSchema);

module.exports =CartModel; 