const response = require("express");

const User = require("../models/User");


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
  res.json({
    response:true
  })
};



module.exports = {
  index
};
