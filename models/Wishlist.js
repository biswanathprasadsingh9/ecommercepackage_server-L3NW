const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  product_id:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
},{timestamps:true})

const Wishlist = mongoose.model('Wishlist',WishlistSchema)
module.exports = Wishlist;
