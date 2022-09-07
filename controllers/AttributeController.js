const response = require("express");

const Attribute = require("../models/Attribute");

// INDEX
const index = (req, res) => {
  Attribute.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  Attribute.find({ name: req.body.name }, (err, doc) => {
    console.log(doc);

    if (doc.length === 0) {
      Attribute.create(req.body).then((response) => {
        res.json({
          response: true,
        });
      });
    } else {
      res.json({
        response: false,
      });
    }
  });
};



const update = (req, res) => {

  Attribute.findOne({name:req.body.name,_id:{$ne:req.body._id}},(err,doc)=>{
    console.log(doc)

    if(doc===null){
      Attribute.findByIdAndUpdate(req.body._id,req.body)
      .then(response=>{
        res.json({
          response:true
        })
      })
    }else{
      res.json({
        response:false
      })
    }

  })




};


const deletefile = (req,res) => {
  Attribute.findByIdAndRemove(req.params.id)
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
