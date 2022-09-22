const response = require("express");

const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");



// INDEX
const index = (req, res) => {
  SubCategory.find()
    .sort({ _id: -1 }).populate('category_id', 'name')
    // .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};


const store = (req,res) => {
  SubCategory.findOne({name:req.body.name},(err,doc)=>{
    if(doc===null){
      SubCategory.create(req.body)
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


}


const update = (req,res) => {
  SubCategory.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


const deletefile = (req,res) => {
  SubCategory.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
  ChildCategory.updateMany({subcategory:req.params.id},{subcategory: ''},{multi: true})
  .then(rrs=>{
    console.log('Success')
  })
}

const updatestatus = (req,res) => {
  var tempData={
    status:req.params.status==='Active'?'Active':'InActive'
  }
  SubCategory.findByIdAndUpdate(req.params.id,tempData)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,store,deletefile,update,updatestatus
};
