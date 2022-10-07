const response = require("express");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");



// INDEX
const flushCache = (req,res) => {
  myCache.flushAll();
  res.json({
    response:true,
    message:'done'
  })
}


const navitems = async (req, res) => {




    nav = myCache.get( "nav_data" );
    if(nav){
      res.json({
        response:true,
        from:'cache',
        data:nav
      })
    }else{
      // var datas=[
      //   {name:"Home",url:'/'},
      //   {name:"Products",url:'/products'},
      //   {name:"Contact",url:'/contact'},
      //   category,
      //   subcategory,
      //   childcategory
      // ]
      // myCache.set( "nav_data", datas, 10000 );
      // res.json({
      //   response:true,
      //   from:'db',
      //   datas
      // })
      Category.aggregate([
      {
          $lookup: {
             from: "subcategories",
             localField: "_id",
             foreignField: "category_id",
             as: "subcategory_data",
             pipeline:[
               {
                 $lookup: {
                  from: "childcategories",
                  localField: "_id",
                  foreignField: "subcategory_id",
                  as: "childcategory_data",
               }
             }
             ]
          }
      },
      ],(err,datas)=>{

        var navdata={
          datas
        }
        myCache.set( "nav_data", navdata, 10000 );
        res.json({
          response:true,
          from:'db',
          data:navdata
        })
      })


    }

};

module.exports = {
  navitems,flushCache
};
