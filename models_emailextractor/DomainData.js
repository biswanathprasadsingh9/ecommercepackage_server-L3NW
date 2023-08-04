const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DomainDataSchema = new Schema({
  domain:{
    type:String
  },
  status:{
    type:String
  },
  emails:{
    type:Object
  },
  tel:{
    type:Object
  },
  facebook:{
    type:Object
  },
  instagram:{
    type:Object
  },
  twitter:{
    type:Object
  },
  linkedin:{
    type:Object
  },
  googleplus:{
    type:Object
  },
  youtube:{
    type:Object
  },
  whatsapp:{
    type:Object
  },
  printrest:{
    type:Object
  },
  skype:{
    type:Object
  }
},{timestamps:true})

const DomainData = mongoose.model('DomainData',DomainDataSchema);
module.exports=DomainData;
