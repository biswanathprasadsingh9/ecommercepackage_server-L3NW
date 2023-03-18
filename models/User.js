const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');
const moment = require('moment');

const UserSchema = new Schema({
  isAdminSeen:{
    type:Boolean,
    default:false
  },

  isAdminSeen:{
    type:Boolean,
    default:false
  },
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
  },
  uniq_login_id_admin:{
    type:String,
  },
  instant_logout_from_all_device:{
    type:Boolean,
    default:false
  },
  enable2stepAuth:{
    type:Boolean,
    default:false
  },
  enablePasswordChange6Month:{
    type:Boolean,
    default:false
  },
  admin_theme:{
    type:String,
    default:'default'
  },
},{timestamps:true})

const User = mongoose.model('User',UserSchema);
module.exports=User;
