const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataStateSchema = new Schema({
  name:{
    type:String
  },
  state_code:{
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

const DataState = mongoose.model('DataState',dataStateSchema)
module.exports = DataState;
