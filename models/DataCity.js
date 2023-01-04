const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataCitySchema = new Schema({
  name:{
    type:String
  },
  state_code:{
    type:String
  },
  state_name:{
    type:String
  },
  country_code:{
    type:String
  },
  country_name:{
    type:String
  },
  active:{
    type:Boolean,
    default:true
  },
},{timestamps:true})

const DataCity = mongoose.model('DataCity',dataCitySchema)
module.exports = DataCity;
