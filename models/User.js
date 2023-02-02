const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');
const moment = require('moment');

const UserSchema = new Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  },
  country:{
    type:String
  },
  state:{
    type:String
  },
  city:{
    type:String
  },
  type:{
    type:String,
    default:'User'
  },
  status:{
    type:Boolean,
    default:true
  },
  created_by:{
    type:String
  },
  emailverification:{
    type:Boolean,
    default:false
  },
  emailverificationcode:{
    type:Number,
    default:Math.floor(111111 + Math.random() * 999999),
  },
  password:{
    type:String
  },
  password_reset_code:{
    type:String
  },
  image:{
    type:Object,
    default:{}
  },
  shipping_info:{
    type:Object,
    default:{}
  },
  psuuid:{ //payment_secret_uuid
    type:String
  },
  pcitems:{ //all cart information
    type:Object,
  },
  ipinfo:{
    type:Object,
  }
},{timestamps:true})

const User = mongoose.model('User',UserSchema);
module.exports=User;
