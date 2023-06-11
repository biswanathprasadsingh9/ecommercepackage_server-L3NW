const response = require("express");

const RolesAdmin = require("../models/RolesAdmin");

// INDEX
const index = (req, res) => {
  RolesAdmin.find()
    // .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};


const store = (req,res) => {
  RolesAdmin.create(req.body)
  .then(response=>{
    res.json({
      response: true,
    });
  })
}

const update = (req,res) => {
  RolesAdmin.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  RolesAdmin.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,store,update,deletefile
};
