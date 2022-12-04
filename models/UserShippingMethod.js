const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShippingMethodSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  shipping_method_id:{type:mongoose.Schema.Types.ObjectId,ref:'UserAddress'},
},{timestamps:true})

const UserShippingMethod = mongoose.model('UserShippingMethod',UserShippingMethodSchema)
module.exports = UserShippingMethod;
