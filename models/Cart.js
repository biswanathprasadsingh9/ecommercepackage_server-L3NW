const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  isAdminSeen:{
    type:Boolean,
    default:false
  },
  system_id:{
    type:String
  },
  product_type:{
    type:String
  },
  product_name:{
    type:String
  },
  product_price:{
    type:String
  },
  parent_product_id:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  product_id:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
  quantity:{
    type:Number
  },
},{timestamps:true})

const Cart = mongoose.model('Cart',CartSchema)
module.exports = Cart;
