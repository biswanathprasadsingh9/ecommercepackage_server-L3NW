const response = require("express");

const Shipping = require("../models/Shipping");

// INDEX
const index = (req, res) => {
  Shipping.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });


  // const dat = Shipping.aggregate([
  // {$match:{
  //  //...
  //  //...
  //  }},
  //
  //
  // { $addFields : {
  //       open: {"$toString" : "$open"},
  //       close : {"$toString" : "$close"},
  //   }},
  // ]);
  //
  // res.json({
  //   dat
  // })
  //
  // console.log(dat)



};

const store = (req, res) => {
  Shipping.create(req.body).then((reask) => {
    res.json({
      response: true,
    });
  });
};


const update = (req,res) => {
  Shipping.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  Shipping.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,
  store,
  update,
  deletefile
};
