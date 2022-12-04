const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAddressSchema = new Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  is_default:{
    type:Boolean
  },
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone1:{
    type:String
  },
  phone2:{
    type:String
  },
  country:{
    type:String
  },
  state:{
    type:String
  },
  towncity:{
    type:String
  },
  zip:{
    type:String
  },
  houseno:{
    type:String
  },
  areastreet:{
    type:String
  },
  landmark:{
    type:String
  },
},{timestamps:true})

const UserAddress = mongoose.model('UserAddress',UserAddressSchema)
module.exports = UserAddress;
