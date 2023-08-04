const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');

const PaymentSchema = new Schema({
  planid:{
    type:String
  },
  planname:{
    type:String
  },
  planmaxupload:{
    type:String
  },
  planmaxextract:{
    type:String
  },
  planprice:{
    type:Number
  },
  planpriceinr:{
    type:Number
  },
  planduraction:{
    type:String
  },
  planstart:{
    type:Date
  },
  planend:{
    type:Date
  },
  userid:{
    type:String
  },
  rozorpayid:{
    type:String
  },
  transactionid:{
    type:String
  },
},{timestamps:true})
const Payment = mongoose.model('Payment',PaymentSchema);
module.exports=Payment;
