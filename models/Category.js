const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
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
  // subcategories: [
  //       {type: mongoose.Schema.Types.ObjectId,ref:'SubCategory'}
  // ]
},{timestamps:true})

const Category = mongoose.model('Category',CategorySchema)
module.exports = Category;
