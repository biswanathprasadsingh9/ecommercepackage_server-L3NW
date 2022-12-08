const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShippingAdditionalCommentsSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  comments:{
    type:String
  }
},{timestamps:true})

const UserShippingAdditionalComments = mongoose.model('UserShippingAdditionalComments',UserShippingAdditionalCommentsSchema)
module.exports = UserShippingAdditionalComments;
