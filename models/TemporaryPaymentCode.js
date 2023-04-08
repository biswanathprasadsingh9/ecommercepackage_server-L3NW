const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');

const TemporaryPaymentCodeSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  temp_send_code:{
    type:String,
    default:'',
  },
  temp_receive_code:{
    type:String,
    default:uuid(),
  },
},{timestamps:true})

const TemporaryPaymentCode = mongoose.model('TemporaryPaymentCode',TemporaryPaymentCodeSchema)
module.exports = TemporaryPaymentCode;
