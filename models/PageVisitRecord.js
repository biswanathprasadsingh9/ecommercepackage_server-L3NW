const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagevisitRecordchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  ipinfo:{
    type:Object
  },
  page_url:{
    type:'String'
  },
  user:{
    type:Boolean
  }
},{timestamps:true})

const PageVisitRecord = mongoose.model('PageVisitRecord',pagevisitRecordchema);
module.exports=PageVisitRecord;
