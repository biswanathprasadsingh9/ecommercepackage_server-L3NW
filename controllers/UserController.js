const response = require("express");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var emailsender = require("./emailsender");


var calculateTax = require("./calculateTax");


const User = require("../models/User");
const UserAddress = require("../models/UserAddress");
const UserShippingMethod = require("../models/UserShippingMethod");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const UserShippingAdditionalComments = require("../models/UserShippingAdditionalComments");



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
  bodydata.is_default=true;

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

  UserAddress.find({user_id:req.body.user_id})
  .then(response=>{
    if(response.length===0){

      var bodydata=req.body;
      bodydata.is_default=true;
      UserAddress.create(bodydata)
      .then(response=>{
        res.json({
            response:true,
        })
      })

    }else{
      UserAddress.create(req.body)
      .then(response=>{
        res.json({
            response:true,
        })
      })
    }
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

//UPDATE ADDRESS
const updateuseraddress =(req,res) => {
  UserAddress.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

//UPDATE DEFAULT ADDRESS
const updatedefauladdress = (req,res) => {
  UserAddress.find({user_id:req.body.user_id}).distinct('_id')
  .then(ids=>{

    UserAddress.updateMany({_id:{$in:ids}},{$set:{is_default:false}},{multi:true})
    .then(ssu=>{

      UserAddress.findByIdAndUpdate(req.body._id,req.body)
      .then(response=>{
        res.json({
          response:true
        })
      })

    })
  })

}

//GET USER SELECTED SHIPPING ADDRESS
const getuserdefaultshippingaddress = (req,res) => {
  UserAddress.findOne({user_id:req.params.user_id,is_default:true},(err,doc)=>{
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


//GET USER SELECTED SHIPPING METHOD (shipping amount)
const getusershippingmethodselected = (req,res) => {
  UserShippingMethod.findOne({user_id:req.params.user_id},(err,doc)=>{
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


//SAVE USER SHIPPING METHOD (shipping amount)
const saveusershippingmethodselected = (req,res) => {

  UserShippingMethod.deleteMany({user_id:req.body.user_id},{multi:true})
  .then(respo=>{
    UserShippingMethod.create(req.body)
    .then(response=>{
      res.json({
        response:true,
        data:req.body
      })
    })
  })

  // UserShippingMethod.findOne({user_id:req.params.user_id},(err,doc)=>{
  //   if(doc===null){
  //     res.json({
  //       response:false
  //     })
  //   }else{
  //     res.json({
  //       response:true,
  //       data:doc
  //     })
  //   }
  // })
}





//GET CAT INFO
const getcartinfo = (req,res) => {
  res.json({
    response:true,
    ss:calculateTax.calculateTaxFunction(1)
  })
}




//GET CATEGORY
const updateshppingadditionalcomments = (req,res) => {
  UserShippingAdditionalComments.update({user_id: req.body.user_id}, req.body, {upsert: true, setDefaultsOnInsert: true})
  .then(response=>{
    res.json({
      response:true
    })
  })
}



const update = (req,res) => {
  User.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{

    User.findById(req.params.id)
    .then(data=>{
      res.json({
        response:true,
        data
      })
    })


  })
}



module.exports = {
  index,register,update,login,emailverification,loginadmin,registerfromcart,getusershippingaddress,addaddressfromcart,deleteaddress,updateuseraddress,updatedefauladdress,getusershippingmethodselected,saveusershippingmethodselected,getuserdefaultshippingaddress,getcartinfo,updateshppingadditionalcomments
};
