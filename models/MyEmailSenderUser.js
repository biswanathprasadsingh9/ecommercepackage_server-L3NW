
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constMyEmailSenderUsers = new Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
},{timestamps:true})

const MyEmailSenderUser = mongoose.model('MyEmailSenderUser',constMyEmailSenderUsers);
module.exports = MyEmailSenderUser;
