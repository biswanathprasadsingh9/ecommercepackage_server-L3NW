const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingRuleSchema = new Schema({
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
    type:Number
  },
  type:{
    type:String
  },
  calculation_type:{
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
  conditions:{
    type:Object
  },
  days_of_week:{
    type:Object
  }
},{timestamps:true})



// ShippingSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret.amount = Number(ret.amount);
//     return ret;
//   },
// });

const ShippingRule = mongoose.model('ShippingRule',ShippingRuleSchema);
module.exports=ShippingRule;
