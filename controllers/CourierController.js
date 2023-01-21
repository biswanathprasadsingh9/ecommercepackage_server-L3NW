const response = require("express");

const Courier = require("../models/Courier");

// INDEX
const index = (req, res) => {
  Courier.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  Courier.create(req.body).then((reask) => {
    res.json({
      response: true,
    });
  });
};


const update = (req,res) => {
  Courier.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  Courier.findByIdAndRemove(req.params.id)
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
