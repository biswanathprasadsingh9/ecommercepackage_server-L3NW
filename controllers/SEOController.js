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

  SubCategory.findOne({url:req.params.subcaturl}).populate('category_id',['name','url']).exec((err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
      })
    }else{
        if(doc.category_id.url===req.params.caturl){
          res.json({
            response:true,
            data:doc
          })
        }else{
          res.json({
            response:false,
          })
        }
    }
  })

}


const getCategorySubcategoryChildcategoryNameFromURL = (req,res) => {
  ChildCategory.findOne({url:req.params.childcaturl}).populate('category_id',['name','url']).populate('subcategory_id',['name','url']).exec((err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
      })
    }else{
        if(doc.category_id.url===req.params.caturl){

          if(doc.subcategory_id.url===req.params.subcaturl){
            res.json({
              response:true,
              data:doc
            })
          }else{
            res.json({
              response:false,
            })
          }
          
        }else{
          res.json({
            response:false,
          })
        }
    }
  })
}


module.exports = {
  index,getCategoryNameFromURL,getCategorySubcategoryNameFromURL,getCategorySubcategoryChildcategoryNameFromURL
};
