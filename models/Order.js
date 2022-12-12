const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  products:{
    type:Object
  },
  user_shipping_address:{
    type:Object
  },
  amount_subtotal:{
    type:Number
  },
  amount_taxes:{
    type:Number
  },
  amount_shipping:{
    type:Number
  },
  amount_total:{
    type:Number
  },
  amount_total_shipping:{
    type:Number
  },
  shipping_method:{
    type:Object
  },
  coupon:{
    type:Object
  },
  shipping_note:{
    type:String
  },
  payment_type:{
    type:String
  },
  payment_status:{
    type:String
  },
  payment_secret_uuid:{
    type:String
  }
},{timestamps:true})

const Order = mongoose.model('Order',OrderSchema)
module.exports = Order;
