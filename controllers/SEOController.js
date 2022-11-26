const response = require("express");

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");

// INDEX
const index = (req, res) => {
  res.json({
    response: true,
  });
};



const getCategoryNameFromURL = (req,res) => {

  Category.findOne({url:req.params.caturl},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
      })
    }else{
      res.json({
        response:true,
        data:doc
      })
    }
  })

}



const getCategorySubcategoryNameFromURL = (req,res) => {
  Category.aggregate([
    { $match: { url: req.params.caturl } },
  ]).exec((err, data) => {
    res.json({
      response: true,
      data
    });
  })
}


module.exports = {
  index,getCategoryNameFromURL,getCategorySubcategoryNameFromURL
};
