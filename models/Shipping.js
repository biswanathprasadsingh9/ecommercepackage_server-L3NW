const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function getDecimalNumber(val) {    return (val/1000000).toFixed(2); }
function setDecimalNumber(val) {    return (val*1000000); }

const ShippingSchema = new Schema({
  isDefault:{
    type:Boolean
  },
  name:{
    type:String
  },
  desc:{
    type:String
  },
  time:{
    type:String
  },
  percentage:{
    type:Number
  },
  amount:{
    type:Number,
    // type:mongoose.Types.Double
    // type:mongoose.Types.Decimal128
    // get: getDecimalNumber,
    // set: setDecimalNumber
    // set: function (v) { return Math.round(v)}
  },
  type:{
    type:String
  },
  status:{
    type:String
  },
},{timestamps:true})



// ShippingSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret.amount = Number(ret.amount);
//     return ret;
//   },
// });

const Shipping = mongoose.model('Shipping',ShippingSchema);
module.exports=Shipping;
