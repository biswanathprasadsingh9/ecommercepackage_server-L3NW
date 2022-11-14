const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  name:{
    type:String
  },
  percentage:{
    type:Number
  },
  amount:{
    type:Number
  },
  type:{
    type:String
  },
  status:{
    type:String
  },
},{timestamps:true})

const Coupon = mongoose.model('Coupon',CouponSchema);
module.exports=Coupon;
