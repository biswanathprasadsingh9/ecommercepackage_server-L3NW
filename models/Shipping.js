const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingSchema = new Schema({
  name:{
    type:String
  },
  desc:{
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

const Shipping = mongoose.model('Shipping',ShippingSchema);
module.exports=Shipping;
