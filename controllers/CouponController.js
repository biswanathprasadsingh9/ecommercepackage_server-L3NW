const response = require("express");

const Coupon = require("../models/Coupon");

// INDEX
const index = (req, res) => {
  Coupon.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  Coupon.create(req.body).then((reask) => {
    res.json({
      response: true,
    });
  });
};


const update = (req,res) => {
  Coupon.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  Coupon.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const checkcouponcode = (req,res) => {
  Coupon.findOne({name:req.body.code},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data:doc
      })
    }
  })
}

module.exports = {
  index,
  store,
  update,
  deletefile,
  checkcouponcode
};
