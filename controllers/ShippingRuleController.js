const response = require("express");

const ShippingRule = require("../models/ShippingRule");

// INDEX
const index = (req, res) => {
  ShippingRule.find()
    // .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};


const store = (req,res) => {
  ShippingRule.create(req.body)
  .then(response=>{
    res.json({
      response: true,
    });
  })
}

const update = (req,res) => {
  ShippingRule.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  ShippingRule.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,store,update,deletefile
};
