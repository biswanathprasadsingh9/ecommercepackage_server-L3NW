const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSendListSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  email_to:{
    type:String
  },
  email_from:{
    type:String
  },
  email_subject:{
    type:String,
  },
  email_body:{
    type:String,
  },
  email_name:{
    type:String
  },
  status:{
    type:Boolean
  }
},{timestamps:true})

const EmailSendList = mongoose.model('EmailSendList',EmailSendListSchema)
module.exports = EmailSendList;
