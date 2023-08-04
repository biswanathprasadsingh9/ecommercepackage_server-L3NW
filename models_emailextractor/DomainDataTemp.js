const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const DomainDataTempSchema = new Schema({
  userid:{
    type:String
  },
  username:{
    type:String
  },
  totaldomains:{
    type:Number
  },
  domains:{
    type:Object
  },
  dateandtime:{
    type:String,
    default:moment().format('Do MMMM YYYY, h:mm:ss a')
  }
},{timestamps:true})

const DomainDataTemp = mongoose.model('DomainDataTemp',DomainDataTempSchema);
module.exports=DomainDataTemp;
