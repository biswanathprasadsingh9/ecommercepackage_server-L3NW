const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaxSchema = new Schema({
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

const Tax = mongoose.model('Tax',TaxSchema);
module.exports=Tax;
