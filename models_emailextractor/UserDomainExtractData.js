const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');

const UserDomainExtractDataSchema = new Schema({
  userid:{
    type:String
  },
  uuid:{
    type:String
  },
  data:{
    type:Object
  },
  totaldomains:{
    type:Number
  },
  recyclebin:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

const UserDomainExtractData = mongoose.model('UserDomainExtractData',UserDomainExtractDataSchema);
module.exports=UserDomainExtractData;
