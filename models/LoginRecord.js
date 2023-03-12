const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginRecordchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  ipinfo:{
    type:Object
  },
  deviceinfo:{
    type:Object
  },
},{timestamps:true})

const LoginRecord = mongoose.model('LoginRecord',loginRecordchema);
module.exports=LoginRecord;
