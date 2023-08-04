const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');

const CountryListSchema = new Schema({
  name:{
    type:String
  },
  code:{
    type:String
  }
},{timestamps:true})

const CountryList = mongoose.model('CountryList',CountryListSchema);
module.exports=CountryList;
