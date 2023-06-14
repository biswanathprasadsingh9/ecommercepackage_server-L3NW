
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constMyEmailSenderViewEmail = new Schema({
  email_send_id:{type:mongoose.Schema.Types.ObjectId,ref:'MyEmailSenderEmail'},
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'MyEmailSenderUser'},

  // email_to:{
  //   type:String
  // },
  // subject:{
  //   type:String
  // },
},{timestamps:true})

const MyEmailSenderViewEmail = mongoose.model('MyEmailSenderViewEmail',constMyEmailSenderViewEmail);
module.exports = MyEmailSenderViewEmail;
