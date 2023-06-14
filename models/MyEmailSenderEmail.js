const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  status:{
    type:String
  },
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'MyEmailSenderUser'},
  email_view_count:{
    type:Number,
    default:0
  },
  email_view_count_code:{
    type:String,
  },
  statusinfo:{
    type:String
  },
  uuid:{
    type:String
  },
  templete:{
    type:String
  },
  name:{
    type:String
  },
  subject:{
    type:String
  },
  body:{
    type:String
  },
  to:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  excel:{
    type:String
  }
},{timestamps:true})

const MyEmailSenderEmail = mongoose.model('MyEmailSenderEmail',EmailSchema);
module.exports = MyEmailSenderEmail;
