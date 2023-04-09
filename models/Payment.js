const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  order_id:{type:mongoose.Schema.Types.ObjectId,ref:'Order'},
  order_code:{type:String},
  // user_payment_sec_code:{
  //   type:String
  // },
  
  payment_method:{
    type:String
  },
  amount:{
    type:String
  },
  // payment_status:{
  //   type:String
  // },
  // paypal_payment_id:{
  //   type:String
  // },
},{timestamps:true})

const Payment = mongoose.model('Payment',paymentSchema)
module.exports = Payment;
