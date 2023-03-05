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
  image:{
    type:String
  },
  image_id:{
    type:String
  },
},{timestamps:true})

const Brand = mongoose.model('Brand',BrandSchema)
module.exports = Brand;
