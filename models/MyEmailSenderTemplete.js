
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempleteSchema = new Schema({
user_id:{type:mongoose.Schema.Types.ObjectId,ref:'MyEmailSenderUser'},
templetename:{
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
}
},{timestamps:true})

const MyEmailSenderTemplete = mongoose.model('MyEmailSenderTemplete',TempleteSchema);
module.exports = MyEmailSenderTemplete;
