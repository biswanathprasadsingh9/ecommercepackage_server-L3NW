const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
  name:{
    type:String
  },
  value:{
    type:String
  },
  code:{
    type:String
  },
  symbol:{
    type:String
  },
},{timestamps:true})

const Currency = mongoose.model('Currency',currencySchema);
module.exports=Currency;
