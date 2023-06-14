const { response } = require("express");

const MyEmailSenderUser = require("../models/MyEmailSenderUser");


//***INDEX***
const index = (req, res) => {
  MyEmailSenderUser.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        data: response,
      });
    })
    .catch({});
};

const create = (req,res) => {
  // MyEmailSenderUser.create({name:'Biswanath Prasad Singh',email:'b21341995returns@gmail.com',password:'b21341995returns@gmail.com'})
  // .then(response=>{
  //   res.json({
  //     response:true
  //   })
  // })

  res.json({
    response:true
  })
}

const login = (req,res) => {
  console.log(req.body)
  MyEmailSenderUser.findOne({email:req.body.email,password:req.body.password})
  .then(response=>{
    if(response){
      res.json({
        response:true,
        data:response
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}


module.exports = { index,create,login };
