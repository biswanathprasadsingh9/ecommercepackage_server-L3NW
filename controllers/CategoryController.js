const response = require("express");

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");



// INDEX
const index = (req, res) => {
  Category.find()
    .sort({ _id: -1 })
    // .populate('subcategories')
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};


const store = (req,res) => {
  Category.findOne({name:req.body.name},(err,doc)=>{
    if(doc===null){

      Category.findOne({url:req.body.url},(err1,doc1)=>{
        if(doc1===null){

          Category.create(req.body)
          .then(response=>{
            res.json({
              response:true
            })
          })
        }else{
          res.json({
            response:false,
            message:'Category url has already been taken'
          })
        }
      })


    }else{
      res.json({
        response:false,
        message:'Category name has already been taken'
      })
    }
  })

}


const update = (req,res) => {
  // Category.findByIdAndUpdate(req.body._id,req.body)
  // .then(response=>{
  //   res.json({
  //     response:true
  //   })
  // })
  // { name: { $nin: req.body.name } }
  Category.findOne({name:req.body.name, _id: { $nin: req.body._id }},(err,doc)=>{
    if(doc===null){

      Category.findOne({url:req.body.url, _id: { $nin: req.body._id }},(err1,doc1)=>{
        if(doc1===null){

          Category.findByIdAndUpdate(req.body._id,req.body)
          .then(response=>{
            res.json({
              response:true
            })
          })
          
        }else{
          res.json({
            response:false,
            message:'Category url has already been taken'
          })
        }
      })


    }else{
      res.json({
        response:false,
        message:'Category name has already been taken'
      })
    }
  })
}


const deletefile = (req,res) => {
  Category.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })

  SubCategory.updateMany({category:req.params.id},{category: ''},{multi: true})
  .then(rrs=>{
    console.log('Success')
  })
  ChildCategory.updateMany({category:req.params.id},{category: ''},{multi: true})
  .then(rrs=>{
    console.log('Success')
  })
}

const updatestatus = (req,res) => {
  var tempData={
    status:req.params.status==='Active'?'Active':'InActive'
  }
  Category.findByIdAndUpdate(req.params.id,tempData)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,store,deletefile,update,updatestatus
};
