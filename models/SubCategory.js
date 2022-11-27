const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  category:{
    type:String
  },
  category_id:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}, //one to one
  // category_id: [{ type: Schema.ObjectId, ref: 'Category' }], //one to many
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

const SubCategory = mongoose.model('SubCategory',SubCategorySchema)
module.exports = SubCategory;
