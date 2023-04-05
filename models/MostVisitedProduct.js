const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagevisitRecordchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  product_id:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
  ipinfo:{
    type:Object
  },
  deviceinfo:{
    type:Object
  },
  page_url:{
    type:'String'
  },
},{timestamps:true})

const MostVisitedProduct = mongoose.model('MostVisitedProduct',pagevisitRecordchema);
module.exports=MostVisitedProduct;
