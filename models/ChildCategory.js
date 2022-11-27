const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildCategorySchema = new Schema({
  // category:{
  //   type:String
  // },
  // subcategory:{
  //   type:String
  // },
  category_id:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
  subcategory_id:{type:mongoose.Schema.Types.ObjectId,ref:'SubCategory'},
  name:{
    type:String
  },
  url:{
    type:String
  },
  status:{
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

const ChildCategory = mongoose.model('ChildCategory',ChildCategorySchema)
module.exports = ChildCategory;
