const {response}= require('express');
const MyEmailSenderTemplete= require('../models/MyEmailSenderTemplete');


//***INDEX***
const index = (req,res) => {
  MyEmailSenderTemplete.find().sort({_id:-1})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
  .catch({
  })
}

const getfiles = (req,res) => {
  MyEmailSenderTemplete.find({user_id:req.params.user_id}).sort({_id:-1})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
  .catch({
  })
}

const view = (req,res) => {
  MyEmailSenderTemplete.findById(req.params.id)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}

const store = (req,res) => {
  MyEmailSenderTemplete.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const update = (req,res) => {
  MyEmailSenderTemplete.findOneAndUpdate({_id:req.body.id},req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const getbyname = (req,res) => {
  MyEmailSenderTemplete.findOne({templetename:req.params.name})
  .then(response=>{
    res.json({
      data:response
    })
  })
}

const deleteid = (req,res) => {
  MyEmailSenderTemplete.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports={index,getfiles,store,view,update,deleteid,getbyname};
