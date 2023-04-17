const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name:{
    type:String
  },
  url:{
    type:String
  },
  status:{
    type:String
  },
  showin_homepage:{
    type:String
  },
  image:{
    type:String
  },
  image_id:{
    type:String
  },
  meta_title:{
    type:String
  },
  meta_desc:{
    type:String
  },
  meta_key:{
    type:String
  },
},{timestamps:true})

const Brand = mongoose.model('Brand',BrandSchema)
module.exports = Brand;
