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
  type:{
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
  }
},{timestamps:true})

const User = mongoose.model('User',UserSchema);
module.exports=User;
