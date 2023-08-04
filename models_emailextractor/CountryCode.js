const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');

const CountryCodeSchema = new Schema({
  country:{
    type:String
  },
  countrycode:{
    type:String
  },
},{timestamps:true})

const CountryCode = mongoose.model('CountryCode',CountryCodeSchema);
module.exports=CountryCode;
