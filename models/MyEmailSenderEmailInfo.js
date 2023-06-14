const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailInfoSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'MyEmailSenderUser'},
  uuid:{
    type:String
  },
  total:{
    type:String
  },
  email:{
    type:String
  },
  templete:{
    type:String
  },
  password:{
    type:String
  }
},{timestamps:true})

const MyEmailSenderEmailInfo = mongoose.model('MyEmailSenderEmailInfo',EmailInfoSchema);
module.exports = MyEmailSenderEmailInfo;
