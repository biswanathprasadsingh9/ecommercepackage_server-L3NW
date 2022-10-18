const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSendListSchema = new Schema({
  email_to:{
    type:String
  },
  email_from:{
    type:String
  },
  email_message_id:{
    type:String,
  },
  email_subject:{
    type:String,
  },
  email_body:{
    type:String,
  }
},{timestamps:true})

const EmailSendList = mongoose.model('EmailSendList',EmailSendListSchema)
module.exports = EmailSendList;
