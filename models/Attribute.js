const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductAttribueSchema = new Schema({
  name:{
    type:String
  },
  type:{
    type:String
  },
  isrequired:{
    type:String
  },
  isvisiblesearch:{
    type:String
  },
  isconfigproduct:{
    type:String
  },
  datasarray:{
    type:Object
  },
  attrbutes_list:{
    type:Object
  },
},{timestamps:true})

const Attribute = mongoose.model('Attribute',ProductAttribueSchema)
module.exports = Attribute;
