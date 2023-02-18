const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  isSeenByAdmin:{
    type:String
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
  subject:{
    type:String
  },
  message:{
    type:String
  },
  ipinfo:{
    type:Object
  },
},{timestamps:true})

const Contact = mongoose.model('Contact',contactSchema);
module.exports=Contact;
