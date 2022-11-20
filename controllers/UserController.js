const response = require("express");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var emailsender = require("./emailsender");

const User = require("../models/User");
const UserAddress = require("../models/UserAddress");





// INDEX
const index = (req, res) => {
  // var data={
  //   name:'test',
  //   email:'test@gmail.com'
  // }
  // User.create(data)
  // .then(response=>{
  //   console.log('111')
  // })


  var ss=emailsender.emailsendFunction('testemail','biswanathprasadsingh9@gmail.com',{name:'John Doe'});
  console.log(ss)

  // .then(response=>{
  //   console.log(response)
  // })

  res.json({
    response:true
  })
};



//REGISTER
const register = (req,res) => {


  var hash = bcrypt.hashSync(req.body.password, salt);

  var bodydata=req.body;
  bodydata.password=hash;

  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      User.create(bodydata)
      .then(response=>{
        res.json({
          response:true,
          data:response,
          message:'user_created'
        })
      })
    }else{
      res.json({
        response:false,
        message:'Email exist',
      })
    }
  })
}


//ADD ADDRESS FROM CART (unregistrated user)
const registerfromcart = (req,res) => {
  var hash = bcrypt.hashSync('123456', salt);

  var bodydata=req.body;
  bodydata.type='User';
  bodydata.password=hash;

  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      User.create(bodydata) //create user
      .then(response=>{

        bodydata.user_id=response._id;
        UserAddress.create(bodydata) //add user address
        .then(asw=>{
          res.json({
            response:true,
            data:response,
            message:'user_created'
          })
        })

      })
    }else{
      res.json({
        response:false,
        message:'Email exist',
      })
    }
  })

}



//ADD ADDRESS FROM CART (registrated user)
const addaddressfromcart = (req,res) => {
  UserAddress.create(req.body)
  .then(response=>{
    res.json({
        response:true,
    })
  })
}



//LOGIN ADMIN
const loginadmin = (req,res) => {
  var bodydata=req.body;

  User.findOne({email:bodydata.email},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'Email not found'
      })
    }else{

        var match = bcrypt.compareSync(bodydata.password, doc.password);
        if(match){

          if(doc.type==='Admin'){
            res.json({
              response:true,
              data:doc,
              message:'Login Success'
            })
          }else{
            res.json({
              response:false,
              message:'Please login as Admin'
            })
          }



        }else{
          res.json({
            response:false,
            message:'Wrong password'
          })
        }


    }
  })

}




//LOGIN
const login = (req,res) => {
  var bodydata=req.body;

  User.findOne({email:bodydata.email},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'Email not found'
      })
    }else{

        var match = bcrypt.compareSync(bodydata.password, doc.password);
        if(match){

          res.json({
            response:true,
            data:doc,
            message:'Login Success'
          })

        }else{
          res.json({
            response:false,
            message:'Wrong password'
          })
        }


    }
  })

}


//Email verification
const emailverification = (req,res) => {

  User.findById(req.body._id,(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'User if not found'
      })
    }else{
      if(doc.emailverificationcode===Number(req.body.code)){
        var updData={
          emailverification:true
        }
        User.findByIdAndUpdate(req.body._id,updData,(err1,doc1)=>{
          User.findById(req.body._id,(err2,doc2)=>{
            res.json({
              response:true,
              message:'Success',
              data:doc2
            })
          })
        })
      }else{
        res.json({
          response:false,
          message:'Wrong verification code'
        })
      }
    }
  })
}


//GET ALL SHIPPING ADDRESS UNDER USER ID
const getusershippingaddress = (req,res) => {

  UserAddress.find({user_id:req.params.id})
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })


}


//DELETE ADDRESS
const deleteaddress = (req,res) => {
  UserAddress.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,register,login,emailverification,loginadmin,registerfromcart,getusershippingaddress,addaddressfromcart,deleteaddress
};
