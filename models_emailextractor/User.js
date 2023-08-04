// const { default: mongoose } = require('mongoose')
// const { connectDBs } = require('../config/db')

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');
const moment = require('moment');
const { connectDBs } = require('../db/db_emailextractor');

const userSchema = new mongoose.Schema({
  loginid:{
    type:String
  },
  name:{
    type:String
  },
  email:{
    type:String
  },
  emailverification:{
    type:String,
    default:'NotVerified'
  },
  emailverificationcode:{
    type:String,
  },
  password:{
    type:String
  },
  company:{
    type:String
  },
  contact:{
    type:String
  },
  country:{
    type:String
  },
  city:{
    type:String
  },
  type:{
    type:String
  },
  packageid:{
    type:String
  },
  packagename:{
    type:String
  },
  packagetype:{
    type:String
  },
  packagestartdate:{
    type:Date,
  },
  packageenddate:{
    type:Date,
  },
  packagetempstartdate:{
    type:Date,
  },
  packagetempenddate:{
    type:Date,
  },
  packageenddatenumber:{
    type:Number
  },
  planid:{
    type:String,
    default:'622af06b40266ce8f0ed4081'
  },
  planname:{
    type:String,
    default:'Free'
  },
  planmaxupload:{
    type:Number,
    default:20
  },
  planmaxextract:{
    type:Number,
    default:90000
  },
  planduraction:{
    type:String,
    default:'Lifetime'
  },
  planstart:{
    type:Date,
    default:moment()
  },
  planend:{
    type:Date,
    default:moment().add(100, 'years')
  }
},{timestamps:true})

const { emailextractorDb } = connectDBs()

const User = emailextractorDb.model('User', userSchema);
module.exports=User;
