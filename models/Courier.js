const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function getDecimalNumber(val) {    return (val/1000000).toFixed(2); }
function setDecimalNumber(val) {    return (val*1000000); }

const courierSchema = new Schema({
  logo:{
    type:Object,
    default:{}
  },
  name:{
    type:String
  },
  tracking_url:{
    type:String
  },
},{timestamps:true})



// courierSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret.amount = Number(ret.amount);
//     return ret;
//   },
// });

const Courier = mongoose.model('Courier',courierSchema);
module.exports=Courier;
