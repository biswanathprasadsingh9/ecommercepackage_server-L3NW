const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  message:{
    type:String
  },
  info_id:{
    type:String
  },
  info_url:{
    type:String
  },
  is_viewed:{
    type:Boolean,
    default:false
  },
  ipinfo:{
    type:Object
  },
  deviceinfo:{
    type:Object
  },
},{timestamps:true})

const Notification = mongoose.model('Notification',notificationSchema)
module.exports = Notification;
