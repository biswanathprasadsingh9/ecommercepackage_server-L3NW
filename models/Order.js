const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  is_ordersuccess_page_viewed:{
    type:Boolean,
    default:false,
  },
  order_id:{
    type:String
  },
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},

  paypal_payment_token:{
    type:String
  },
  payment_type:{
    type:String
  },
  payment_status:{
    type:String
  },
  order_status:{
    type:String,
    default:'Pending'
  },
  user_shipping_address:{
    type:Object
  },
  products:{
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
  amount_total_final:{
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
  courier_id:{type:mongoose.Schema.Types.ObjectId,ref:'Courier'},
  courier_tracking_id:{
    type:String
  },
  // amount_shipping:{
  //   type:Number
  // },
  // amount_total:{
  //   type:Number
  // },
  // amount_total_shipping:{
  //   type:Number
  // },
  // shipping_method:{
  //   type:Object
  // },
  // coupon:{
  //   type:Object
  // },
  // shipping_note:{
  //   type:String
  // },


},{timestamps:true})

const Order = mongoose.model('Order',OrderSchema)
module.exports = Order;
