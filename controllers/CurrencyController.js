const response = require("express");

const Currency = require("../models/Currency");

// INDEX
const index = (req, res) => {
  Currency.find()
    // .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  console.log(req.body)
  Currency.create(req.body).then((reask) => {
    res.json({
      response: true,
    });
  });
};


const update = (req,res) => {
  Currency.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  Currency.findByIdAndRemove(req.params.id)
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
