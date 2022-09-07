const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  category:{
    type:String
  },
  name:{
    type:String
  },
  url:{
    type:String
  },
  status:{
    type:String
  },
},{timestamps:true})

const SubCategory = mongoose.model('SubCategory',SubCategorySchema)
module.exports = SubCategory;
