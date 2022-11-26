const response = require("express");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");

const Product = require("../models/Product");




// INDEX
const flushCache = (req,res) => {
  myCache.flushAll();
  res.json({
    response:true,
    message:'done'
  })
}


const navitems = async (req, res) => {

  Category.aggregate([
    // {
    //   $match:{categories:{status:'Active'}}
    // },

  {
      $lookup: {
         from: "subcategories",
         localField: "_id",
         foreignField: "category_id",
         as: "subcategory_data",
         pipeline:[
           {$match:{status:'Active'}},
           {
             $lookup: {
              from: "childcategories",
              localField: "_id",
              foreignField: "subcategory_id",
              as: "childcategory_data",
              pipeline:[
                {$match:{status:'Active'}},
              ]
            }
          }
         ]
      },
  },
  {$match:{status:'Active'}},


  ],(err,datas)=>{

    var navdata={
      datas
    }
    res.json({
      response:true,
      from:'db',
      data:navdata
    })
  })


    // nav = myCache.get( "nav_data" );
    // if(nav){
    //   res.json({
    //     response:true,
    //     from:'cache',
    //     data:nav
    //   })
    // }else{
    //   Category.aggregate([
    //   {
    //       $lookup: {
    //          from: "subcategories",
    //          localField: "_id",
    //          foreignField: "category_id",
    //          as: "subcategory_data",
    //          pipeline:[
    //            {
    //              $lookup: {
    //               from: "childcategories",
    //               localField: "_id",
    //               foreignField: "subcategory_id",
    //               as: "childcategory_data",
    //            }
    //          }
    //          ]
    //       }
    //   },
    //   ],(err,datas)=>{
    //
    //     var navdata={
    //       datas
    //     }
    //     myCache.set( "nav_data", navdata, 10000 );
    //     res.json({
    //       response:true,
    //       from:'db',
    //       data:navdata
    //     })
    //   })
    //
    //
    // }

};



const viewproduct =(req,res) => {



    Product.findOne({url:req.params.url},(err,data)=>{
      if(!err){
        res.json({
          response:true,
          data
        })
      }else{
        res.json({
          response:false,
          message:'Product not found'
        })
      }
    })


  // if(req.params.type==='Configurable'){
  //   Product.findOne({_id:req.params.id},(err,parentdata)=>{
  //     if(!err){
  //       Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:req.params.id},(err1,childdata)=>{
  //         if(!err1){
  //
  //           res.json({
  //             response:true,
  //             total:childdata.length,
  //             parentdata,
  //             childdata
  //           })
  //
  //         }else{
  //           res.json({
  //             response:false,
  //             message:'childdata_data_error'
  //           })
  //         }
  //       })
  //
  //
  //     }else{
  //       res.json({
  //         response:false,
  //         message:'parent_data_error'
  //       })
  //     }
  //   })
  // }
}

module.exports = {
  navitems,flushCache,viewproduct
};
