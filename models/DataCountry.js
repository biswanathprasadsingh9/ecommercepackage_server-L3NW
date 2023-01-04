const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataCountrySchema = new Schema({
  name:{
    type:String
  },
  iso2:{
    type:String
  },
  iso3:{
    type:String
  },
  phone_code:{
    type:String
  },
  currency:{
    type:String
  },
  currency_name:{
    type:String
  },
  currency_symbol:{
    type:String
  },
  active:{
    type:Boolean,
    default:true
  },
},{timestamps:true})

const DataCountry = mongoose.model('DataCountry',dataCountrySchema)
module.exports = DataCountry;
