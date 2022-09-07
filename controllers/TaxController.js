const response = require("express");

const Tax = require("../models/Tax");

// INDEX
const index = (req, res) => {
  Tax.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  Tax.create(req.body).then((reask) => {
    res.json({
      response: true,
    });
  });
};


const update = (req,res) => {
  Tax.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  Tax.findByIdAndRemove(req.params.id)
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
