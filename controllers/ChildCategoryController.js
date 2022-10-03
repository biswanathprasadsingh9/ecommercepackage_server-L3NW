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
  // ChildCategory.create(req.body)
  // .then(response=>{
  //   res.json({
  //     response:true
  //   })
  // })
  ChildCategory.findOne({name:req.body.name},(err,doc)=>{
    if(doc===null){

      ChildCategory.findOne({url:req.body.url},(err1,doc1)=>{
        if(doc1===null){

          ChildCategory.create(req.body)
          .then(response=>{
            res.json({
              response:true
            })
          })
        }else{
          res.json({
            response:false,
            message:'SubCategory url has already been taken'
          })
        }
      })


    }else{
      res.json({
        response:false,
        message:'SubCategory name has already been taken'
      })
    }
  })
}


const update = (req,res) => {
  // ChildCategory.findByIdAndUpdate(req.body._id,req.body)
  // .then(response=>{
  //   res.json({
  //     response:true
  //   })
  // })
  ChildCategory.findOne({name:req.body.name, _id: { $nin: req.body._id }},(err,doc)=>{
    if(doc===null){

      ChildCategory.findOne({url:req.body.url, _id: { $nin: req.body._id }},(err1,doc1)=>{
        if(doc1===null){

          ChildCategory.findByIdAndUpdate(req.body._id,req.body)
          .then(response=>{
            res.json({
              response:true
            })
          })

        }else{
          res.json({
            response:false,
            message:'Child Category url has already been taken'
          })
        }
      })


    }else{
      res.json({
        response:false,
        message:'Child Category name has already been taken'
      })
    }
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
