const mongoose = require('mongoose');
const Schema = mongoose.Schema;


function getDecimalNumber(val) {    return (val/1000000).toFixed(2); }
function setDecimalNumber(val) {    return (val*1000000); }

const ShippingSchema = new Schema({
  isDefault:{
    type:Boolean
  },
  title:{
    type:String
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
  },
  type:{
    type:String
  },
  shipping_type:{
    type:String
  },
  cost:{
    type:String
  },
  status:{
    type:Boolean
  },
  conditions_match_all:{
    type:Boolean
  },
  conditions_enable:{
    type:Boolean
  },
  calculation_type:{
    type:String
  },
  conditions:{
    type:Object
  },
  days_of_week:{
    type:Object
  },
  enableCountry:{
    type:Boolean
  },
  enableState:{
    type:Boolean
  },
  country_list:{
    type:Object
  },
  state_list:{
    type:Object
  },
  // status:{
  //   type:String
  // },
  // country:{
  //   type:Object
  // },
  // check_cart_price:{
  //   type:Boolean
  // },
  // cart_price_min:{
  //   type:Number
  // },
  // cart_price_max:{
  //   type:Number
  // },
  // check_cart_quantity:{
  //   type:Boolean
  // },
  // cart_quantity_min:{
  //   type:Number
  // },
  // cart_quantity_min:{
  //   type:Number
  // },
},{timestamps:true})



// ShippingSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret.amount = Number(ret.amount);
//     return ret;
//   },
// });

const Shipping = mongoose.model('Shipping',ShippingSchema);
module.exports=Shipping;
