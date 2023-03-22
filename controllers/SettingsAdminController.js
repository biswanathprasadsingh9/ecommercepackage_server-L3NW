const response = require("express");

const SettingsAdmin = require("../models/SettingsAdmin");
const User = require("../models/User");


// INDEX
const index = (req, res) => {

  // var data={
  //   allow_access_desktop:true,
  //   allow_access_phone_tab:true,
  //   allow_access_all_ip:true,
  // }

  SettingsAdmin.find()
  .then(data=>{
    res.json({
      response:true,
      data:data[0]
    })
  }).catch(err=>{
    res.json({
      response:false,
    })
  })

};



const update = (req,res) => {
  SettingsAdmin.findByIdAndUpdate(req.body._id,req.body)
  .then(dataas=>{

    SettingsAdmin.findById(req.body._id)
    .then(data=>{
      res.json({
        response:true,
        data:data
      })
    })

  }).catch(err=>{
    res.json({
      response:false,
    })
  })
}

const with_user_details = (req,res) => {

  try {
    SettingsAdmin.find()
    .then(data=>{

      User.findById(req.params.user_id).select({instant_logout_from_all_device: 1, status:1})
      .then(userinfo=>{
        res.json({
          response:true,
          data:data[0],
          userinfo
        })
      })


    }).catch(err=>{
      res.json({
        response:false,
      })
    })
  } catch (e) {
    res.json({
      response:false,
    })
  }
}

const logout_admin_from_all_devices = (req,res) => {
  try {
    User.updateMany({type:'Admin'},{$set:{instant_logout_from_all_device:true}})
    .then(res11=>{
      SettingsAdmin.updateMany({}, {$set: {all_admin_instant_logout: true}})
      .then(res22=>{
        res.json({
          response:true,
        })
      })
    })
  } catch (e) {
    res.json({
      response:false,
    })
  }

}


const logout_myaccount_from_alldevices = (req,res) => {
  try {
    User.findOneAndUpdate({_id:req.params.user_id},{$set:{instant_logout_from_all_device:true}})
    .then(res11=>{
      res.json({
        response:true,
      })
    })
  } catch (e) {
    res.json({
      response:false,
    })
  }
}

module.exports = {
  index,update,with_user_details,logout_admin_from_all_devices,logout_myaccount_from_alldevices
};
