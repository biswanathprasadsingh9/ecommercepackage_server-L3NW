const response = require("express");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");
const Product = require("../models/Product");
const Brand = require("../models/Brand");




// INDEX
const flushCache = (req,res) => {
  myCache.flushAll();
  res.json({
    response:true,
    message:'done'
  })
}

const homepage = async (req,res) => {


  // Today’s Deals
  // Featured products
  // Suggested for You
  // Most popular
  // Weekly deals
// Recommended Items
// You May Like...
// Recently Viewed
// DEALS YOU DON'T WANT TO MISS

  // const new_products = await Product.find({type:['Configurable','Simple'],product_collection:'New Arrivals'}).select({name:1,url:1});



// todays deals 10
// trending_products 10
// most popular 10
  const todays_deals = await Product
                    .find({status:'Active',type:['Configurable','Simple'],product_collection:'Todays Deals'})
                    .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
                    .limit(16);

  const trending_products = await Product
                      .find({status:'Active',type:['Configurable','Simple'],product_collection:'Trending'})
                      .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
                      .limit(16);

  const new_arrivals_products = await Product
                      .find({status:'Active',type:['Configurable','Simple'],product_collection:'New Arrivals'})
                      .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
                      .limit(16);




  const special_watch_section = await Product
                      .find({status:'Active',type:['Configurable','Simple'],subcategory:['6426fc3ae36e120028e2147b']})
                      .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
                      .limit(6);



  const most_popular = await Product
                      .find({status:'Active',type:['Configurable','Simple'],product_collection:'Most Popular'})
                      .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
                      .limit(12);


  const top_brands = await Brand
                      .find({status:'Active',showin_homepage:'Yes'})
                      .select({ _id: 1, name: 1, image:1})
                      // .limit(12);



  var datas={
    todays_deals,
    trending_products,
    new_arrivals_products,
    special_watch_section,
    most_popular,
    top_brands
  }

  res.json({
    response:true,
    datas
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



const testpdf = (req,res) => {
  var pdf = require("pdf-creator-node");
    // var pdf = require("../index");
    var fs = require("fs");
    var path = require("path");
    // Read HTML Template
    var html = fs.readFileSync(path.join(__dirname, "../pdf_templete/templetetest.html"), "utf8");

    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
    };

    var users = [
      {
        name: "Shyam",
        age: "26",
      },
      {
        name: "Navjot",
        age: "26",
      },
      {
        name: "Vitthal",
        age: "26",
      },
    ];


    //INVOICE NUMBER
    var d = new Date();
    var n = d.valueOf();

    var invoice_number = 'EX'+n;






    var document = {
      html: html,
      data: {
        invoice_number,
        users: users,
        name:'Biswnath Prasad Singh'
      },
      path: "./pdf/output.pdf",
      type: "pdf", // "stream" || "buffer" || "" ("" defaults to pdf)
    };

    // console.log(document);
    pdf
    .create(document, options)
    .then((as) => {
      console.log(as);
      res.json({
        resonse:true,
        as
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

const todaysdealspage = (req,res) => {
  Product
  .find({status:'Active',type:['Configurable','Simple'],product_collection:'Todays Deals'})
  .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
  .then(datas=>{
    res.json({
      response:false,
      datas
    })
  })
}

const trendingpage = (req,res) => {
  Product
  .find({status:'Active',type:['Configurable','Simple'],product_collection:'Trending'})
  .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
  .then(datas=>{
    res.json({
      response:false,
      datas
    })
  })
}


const newarrivalpage = (req,res) => {
  Product
  .find({status:'Active',type:['Configurable','Simple'],product_collection:'New Arrivals'})
  .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
  .then(datas=>{
    res.json({
      response:false,
      datas
    })
  })
}

const popularproductspage = (req,res) => {
  Product
  .find({status:'Active',type:['Configurable','Simple'],product_collection:'Most Popular'})
  .select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
  .then(datas=>{
    res.json({
      response:false,
      datas
    })
  })
}


module.exports = {
  navitems,flushCache,viewproduct,testpdf,homepage,todaysdealspage,trendingpage,newarrivalpage,popularproductspage
};
