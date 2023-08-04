const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');

const PlanSchema = new Schema({
  planname:{
    type:String
  },
  price:{
    type:Number
  },
  priceinr:{
    type:Number
  },
  maxupload:{
    type:Number
  },
  maxextract:{
    type:Number
  },
  validity:{
    type:String
  },
},{timestamps:true})

const Plan = mongoose.model('Plan',PlanSchema);
module.exports=Plan;
