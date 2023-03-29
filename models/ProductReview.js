const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productReviewSchema = new Schema({
  isAdminSeen:{
    type:Boolean,
    default:false
  },
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  product_id:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
  rating:{
    type:Number
  },
  comment:{
    type:String
  },
},{timestamps:true})

const ProductReview = mongoose.model('ProductReview',productReviewSchema)
module.exports = ProductReview;
