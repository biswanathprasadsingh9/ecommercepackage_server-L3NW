const response = require("express");

const SettingsAdmin = require("../models/SettingsAdmin");

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

module.exports = {
  index,update
};
