const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderTimelineSchema = new Schema({
  order_id:{
    type:String
  },
  name:{
    type:String
  },
},{timestamps:true})

const OrderTimeline = mongoose.model('OrderTimeline',OrderTimelineSchema)
module.exports = OrderTimeline;
