const response = require("express");

const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");



// INDEX
const index = (req, res) => {
  ChildCategory.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};


const store = (req,res) => {
  ChildCategory.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


const update = (req,res) => {
  ChildCategory.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


const deletefile = (req,res) => {
  ChildCategory.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const updatestatus = (req,res) => {
  var tempData={
    status:req.params.status==='Active'?'Active':'InActive'
  }
  ChildCategory.findByIdAndUpdate(req.params.id,tempData)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,store,deletefile,update,updatestatus
};
