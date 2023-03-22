const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsAdminSchema = new Schema({
  allow_access_desktop:{
    type:Boolean,
    default:true
  },
  allow_access_tablet:{
    type:Boolean,
    default:true
  },
  allow_access_mobile:{
    type:Boolean,
    default:true
  },
  allow_access_all_ip:{
    type:Boolean,
    default:true
  },
  all_admin_instant_logout:{
    type:Boolean,
    default:false
  },
  ipinfo:{
    type:Object
  },
  deviceinfo:{
    type:Object
  },
},{timestamps:true})

const SettingsAdmin = mongoose.model('SettingsAdmin',SettingsAdminSchema)
module.exports = SettingsAdmin;
