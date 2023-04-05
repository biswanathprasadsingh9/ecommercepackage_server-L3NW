const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagevisitRecordchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  ipinfo:{
    type:Object
  },
  deviceinfo:{
    type:Object
  },
  page_url:{
    type:'String'
  },
  user:{
    type:Boolean
  },
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
},{timestamps:true})

const PageVisitRecord = mongoose.model('PageVisitRecord',pagevisitRecordchema);
module.exports=PageVisitRecord;
