const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  brand_name:{
    type:String
  },
  brand_url:{
    type:String
  },
  brand_status:{
    type:String
  },
  brand_image:{
    type:String
  },
  brand_image_id:{
    type:String
  },
},{timestamps:true})

const Brand = mongoose.model('Brand',BrandSchema)
module.exports = Brand;
