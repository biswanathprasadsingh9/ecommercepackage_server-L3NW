const response = require("express");

const Contact = require("../models/Contact");

// INDEX
const index = (req, res) => {
  Contact.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  Contact.create(req.body).then((reask) => {
    res.json({
      response: true,
    });
  });
};


const update = (req,res) => {
  Contact.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  Contact.findByIdAndRemove(req.params.id)
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
