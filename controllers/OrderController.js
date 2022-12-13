const response = require("express");
const { uuid } = require('uuidv4');


const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");




// INDEX
const index = (req, res) => {
  res.json({
    response: true,
  });
};


// PAY ON DELIVERY
const payondelivery = (req,res) => {

  var payment_secret_uuid=uuid();

  User.findByIdAndUpdate(req.body.user_id,{$set:{psuuid:payment_secret_uuid,pcitems:req.body}}) //update payment secret code under user
  .then(user_update=>{
    res.json({
      response:true,
      uuid:payment_secret_uuid,
      datas:req.body
    })
  })

}


// PAY ON PAYPAL
const payonpaypal = (req,res) => {

  var payment_secret_uuid=uuid();

  User.findByIdAndUpdate(req.body.user_id,{$set:{psuuid:payment_secret_uuid,pcitems:req.body}}) //update payment secret code under user
  .then(user_update=>{
    res.json({
      response:true,
      uuid:payment_secret_uuid,
      datas:req.body
    })
  })


}



module.exports = {
  index,payondelivery,payonpaypal
};
