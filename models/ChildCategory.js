const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildCategorySchema = new Schema({
  category:{
    type:String
  },
  subcategory:{
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

const ChildCategory = mongoose.model('ChildCategory',ChildCategorySchema)
module.exports = ChildCategory;
