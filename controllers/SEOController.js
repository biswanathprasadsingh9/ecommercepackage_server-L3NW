const response = require("express");

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");
const Brand = require("../models/Brand");


const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

// INDEX
const index = (req, res) => {
  res.json({
    response: true,
  });
};

const cacheflush = (req,res) => {
  myCache.flushAll();
  res.json({
    resonse:true
  })
}


const getCategoryNameFromURL = (req,res) => {

  if(myCache.has(`getCategoryNameFromURL__${req.params.caturl}`)){
    res.json({
      response:true,
      cache:true,
      data:myCache.get(`getCategoryNameFromURL__${req.params.caturl}`)
    })
  }else{
    Category.findOne({url:req.params.caturl},(err,doc)=>{
      if(doc===null){
        res.json({
          response:false,
        })
      }else{
        myCache.set(`getCategoryNameFromURL__${req.params.caturl}`, doc)
        res.json({
          response:true,
          cache:false,
          data:doc
        })
      }
    })
  }
}



const getBrandNameFromURL = (req,res) => {
  if(myCache.has(`getBrandNameFromURL__${req.params.name}`)){
    res.json({
      response:true,
      cache:true,
      data:myCache.get(`getBrandNameFromURL__${req.params.name}`)
    })
  }else{
    Brand.findOne({name:req.params.name},(err,doc)=>{
      if(doc===null){
        res.json({
          response:false,
        })
      }else{
        myCache.set(`getBrandNameFromURL__${req.params.name}`, doc)
        res.json({
          response:true,
          cache:false,
          data:doc
        })
      }
    })
  }
}




const getCategorySubcategoryNameFromURL = (req,res) => {

  if(myCache.has(`getCategorySubcategoryNameFromURL_${req.params.subcaturl}`)){
    res.json({
      response:true,
      cache:true,
      data:myCache.get(`getCategorySubcategoryNameFromURL_${req.params.subcaturl}`)
    })
  }else{

    SubCategory.findOne({url:req.params.subcaturl}).populate('category_id',['name','url']).exec((err,doc)=>{
      if(doc===null){
        res.json({
          response:false,
        })
      }else{
          if(doc.category_id.url===req.params.caturl){
            myCache.set(`getCategorySubcategoryNameFromURL_${req.params.subcaturl}`, doc)
            res.json({
              response:true,
              cache:false,
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

}


const getCategorySubcategoryChildcategoryNameFromURL = (req,res) => {

  if(myCache.has(`getCategorySubcategoryChildcategoryNameFromURL__${req.params.childcaturl}`)){
    res.json({
      response:true,
      cache:true,
      data:myCache.get(`getCategorySubcategoryChildcategoryNameFromURL__${req.params.childcaturl}`)
    })
  }else{

    ChildCategory.findOne({url:req.params.childcaturl}).populate('category_id',['name','url']).populate('subcategory_id',['name','url']).exec((err,doc)=>{
      if(doc===null){
        res.json({
          response:false,
        })
      }else{
          if(doc.category_id.url===req.params.caturl){

            if(doc.subcategory_id.url===req.params.subcaturl){
              myCache.set(`getCategorySubcategoryChildcategoryNameFromURL__${req.params.childcaturl}`, doc)
              res.json({
                response:true,
                cache:false,
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
}


module.exports = {
  index,cacheflush,getCategoryNameFromURL,getCategorySubcategoryNameFromURL,getCategorySubcategoryChildcategoryNameFromURL,getBrandNameFromURL
};
