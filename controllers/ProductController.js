const response = require("express");
var randomstring = require("randomstring");
const _ = require("lodash");

const Product = require("../models/Product");
const Attribute = require("../models/Attribute");


const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});

// SEO FRIENDLY URL GENERATOR
function ToSeoUrl(url) {
  // make the url lowercase
  var encodedUrl = url.toString().toLowerCase();
  // replace & with and
  encodedUrl = encodedUrl.split(/\&+/).join("-and-")
  // remove invalid characters
  encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");
  // remove duplicates
  encodedUrl = encodedUrl.split(/-+/).join("-");
  // trim leading & trailing characters
  encodedUrl = encodedUrl.trim('-');
  return encodedUrl;
}
// SEO FRIENDLY URL GENERATOR



// INDEX
const index = (req, res) => {
  Product.find({type:['Configurable','Simple']})
  // Product.find({type:['Configurable']})
  // Product.find({})
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};



const singleproductinformation = (req,res) => {
  Product.findById(req.params.id)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })

  // Product.findOne({_id: req.params.id })
  //  .populate("category") // key to populate
  //  .then(response => {
  //    res.json({
  //      response:true,
  //      data:response
  //    })
  //  });

}



const viewproductinfo = (req,res) => {

  if(req.params.type==='Configurable'){


    Product.findOne({_id:req.params.id},(err,parentdata)=>{
      if(!err){
        Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:req.params.id},(err1,childdata)=>{
          if(!err1){

            res.json({
              response:true,
              total:childdata.length,
              parentdata,
              childdata
            })

          }else{
            res.json({
              response:false,
              message:'childdata_data_error'
            })
          }
        })


      }else{
        res.json({
          response:false,
          message:'parent_data_error'
        })
      }
    })
  }

}



const viewurl = (req,res) => {
  Product.findOne({url:req.params.url},(err,parentdata)=>{
    if(parentdata!==null){
      if(parentdata.type==='Simple'){
        res.json({
          response:true,
          parentdata,
          childdata:false
        })

      }else{

        Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:parentdata._id},(err1,childdata)=>{
          if(!err1){
            res.json({
              response:true,
              parentdata,
              childdata
            })

          }else{
            res.json({
              response:false,
              message:'childdata_data_error'
            })
          }
        })
      }

    }else{
      console.log(err)
      res.json({
        response:false,
        message:'product_not_found'
      })
    }
  })
}





const allproducts = async (req,res) => {

  //page number
  var page= 1;

  var showpage = page-1;
  var perPage = Number(2)
  , page = showpage > 0 ? showpage : 0

  var findQuery={status:'Active',type:['Configurable']};


  Product
    .find(findQuery)
    .limit(perPage)
    .skip(perPage * page)
    .sort({_id: 'desc'})
    .exec(function (err, doc) {
      Product.find(findQuery).count().exec(async function (err, count) {


        var jsonData={
          response: true,
          page_number: page+1,
          total_pages: Math.ceil(count / perPage),
          total_datas:count,
          datas_per_page:perPage,
          attributes:{
            sizes : await Product.find(findQuery).distinct("myattributes.Size"),
            color: await Product.find(findQuery).distinct("myattributes.Color"),
            group: await Product.find(findQuery).distinct("myattributes.Group"),

          },
          datas: doc,
        }




        res.json({
          ...jsonData
        })
      })
    })


    Product.find(findQuery).distinct('myattributes.Size').count().exec(function (err, count) {
        console.log('The number of unique users is: %d', count);
    });

    Product.find(findQuery)
      .distinct('myattributes.Size')
      .count(function (err, count) {
          //The number of unique users is 'count'
          // console.log(count)
      })

    // console.log(123)

}






//FINAL
const productsearchfinal = async (req,res) => {
  console.log(req.body)

  res.json({
    response:true
  })
}



const productsearch = async (req,res) => {

  console.log(req.body)

  ////PAGINATION////
  var page= req.body.pagination_page_number;

  var showpage = page-1;
  var perPage = req.body.pagination_datas_per_page
  , page = showpage > 0 ? showpage : 0


  var searchQuery = {
    "status":'Active',
    "type": { "$in": [ 'Configurable', 'Simple' ] },
    "pricemain":{"$gte": req.body.search_price_min,"$lte": req.body.search_price_max},



    // "category": { "$in": req.body.search_main_attributes.category },
    // "subcategory": { "$in": req.body.search_main_attributes.subcategory },
    // "childcategory": { "$in": req.body.search_main_attributes.childcategory },


    // "pricemain":{"$gte": 0,"$lte": 222222222222222},
    // category: { "$in": [ 'Women', 'Simple' ] },
    // "subcategory": ['Boys']
    // category: { "$in": ['Home and Living'] },
  };

  var search_main_attributes = req.body.search_main_attributes;
  var objectkeys=Object.keys(search_main_attributes);
  objectkeys.forEach((item, i) => {
      if(search_main_attributes[item].length!==0){
        var titem=item;
        searchQuery[item] = { "$in": search_main_attributes[item] }
      }
  });
  //****backup dont delete
  // var search_other_attributes = req.body.search_other_attributes;
  // var objectkeysZ=Object.keys(search_other_attributes);
  // objectkeysZ.forEach((item, i) => {
  //     if(search_other_attributes[item].length!==0){
  //       var titem='config_attribues.'+item;
  //       searchQuery[titem] = { "$in": search_other_attributes[item] }
  //     }
  // });
  var search_other_attributes = req.body.search_other_attributes;
  var objectkeysZ=Object.keys(search_other_attributes);
  objectkeysZ.forEach((item, i) => {
      if(search_other_attributes[item].length!==0){
        var titem=item;
        searchQuery[titem] = { "$in": search_other_attributes[item] }
      }
  });


  //***first 1
  // Product.find(searchQuery).limit(perPage).skip(perPage * page)
  var query = Product.find(searchQuery,).sort({[req.body.search_sortby.vname]:req.body.search_sortby.value}).limit(perPage).skip(perPage * page);
  query.select({ _id: 1, name: 1, category: 1, url: 1, type:1, price_lowest: 1, price_heighest: 1, images: { $slice: 1 } });
  query.exec(async function(err,main_datas){


      //***second 2
      var query2 = Product.find(searchQuery).select(['-images','-videos']) //remove unnecessary fields here
      query2.exec(async function(err,all_datas){


        res.json({
          response: true,
          page_number: page+1,
          total_pages: Math.ceil(all_datas.length/ perPage),
          total_datas:all_datas.length,
          datas_per_page:perPage,
          datas: main_datas,
          price_slider:{
            max:all_datas.length>0? _.maxBy(all_datas, function(o) { return o.price_heighest }).price_heighest:0,
            min:all_datas.length>0?_.minBy(all_datas, function(o) { return o.price_lowest }).price_lowest:0,
          },
          count_attributes:{
            category: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$category" },{ $sortByCount: "$category" }]),
            // category: await Product.aggregate([{ $unwind: "$category" },{ $sortByCount: "$category" }]),
            subcategory: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$subcategory" },{ $sortByCount: "$subcategory" }]),
            childcategory: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$childcategory" },{ $sortByCount: "$childcategory" }]),
            '63329659a7f02029b877a5ce': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63329659a7f02029b877a5ce" },{ $sortByCount: "$63329659a7f02029b877a5ce" }]), //size
            '633296fea7f02029b877a5d2': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$633296fea7f02029b877a5d2" },{ $sortByCount: "$633296fea7f02029b877a5d2" }]), //size
            '6332971ca7f02029b877a5d6': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$6332971ca7f02029b877a5d6" },{ $sortByCount: "$6332971ca7f02029b877a5d6" }]),
            '63329744a7f02029b877a5da': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63329744a7f02029b877a5da" },{ $sortByCount: "$63329744a7f02029b877a5da" }]),
            '63329a57a7f02029b877a5e7': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63329a57a7f02029b877a5e7" },{ $sortByCount: "$63329a57a7f02029b877a5e7" }]),
          },
          main_attributes:{ //---normal attribute
            category: _.compact(await query2.distinct("category")),
            subcategory: _.compact(await query2.distinct("subcategory")),
            childcategory: _.compact(await query2.distinct("childcategory")),
          },
          other_attributes:{ //---config attribute
            '63329659a7f02029b877a5ce': _.compact(await query2.distinct("63329659a7f02029b877a5ce")),
            '633296fea7f02029b877a5d2': _.compact(await query2.distinct("633296fea7f02029b877a5d2")),
            '6332971ca7f02029b877a5d6': _.compact(await query2.distinct("6332971ca7f02029b877a5d6")),
            '63329744a7f02029b877a5da': _.compact(await query2.distinct("63329744a7f02029b877a5da")),
            '63329a57a7f02029b877a5e7': _.compact(await query2.distinct("63329a57a7f02029b877a5e7")),
          }
        })
      })
  })
}


const showallproductspagination = (req,res) => {
  var page= req.params.page;

  var showpage = page-1;
  var perPage = 2
  , page = showpage > 0 ? showpage : 0

  Product
    .find({type:['Configurable']})
    // .select('name')
    .limit(perPage)
    .skip(perPage * page)
    .sort({_id: 'desc'})
    .exec(function (err, events) {
      Product.find({type:['Configurable']}).count().exec(function (err, count) {
        res.json({
          events: events,
          page: page+1,
          pages: Math.ceil(count / perPage),
          tot:count

        })
      })
    })
}



//CREATE STEP 1
const create1 = async (req,res) => {
  Product.findOne({sku:req.body.sku},async(errx,docx)=>{
    if(docx===null){

      Product.findOne({url:req.body.url}, async(err,doc)=>{
        if(doc===null){
          //Configurable Product Create
          if(req.body.type==='Configurable'){

            //UPDATE ATTRIBUTE
            // var attributedata=[];
            // var jsondata = await Attribute.find({});
            //
            // jsondata.forEach((attr, i) => {
            //   if(attr.type==='Single Dropdown' || attr.type==='Multiple Dropdown' || attr.type==='Radio' || attr.type==='Checkbox'){
            //     if(attr.isconfigproduct==='Yes'){
            //       attributedata.push({
            //         _id:attr._id,
            //         name:attr.name,
            //         values:attr.datasarray,
            //       })
            //     }
            //   }
            // });

            var entrydata={
              status:req.body.status,
              // type:req.body.type,
              type:'Configurable',
              url:req.body.url,
              is_parent:'Yes',
              sku:req.body.sku,
              name:req.body.name,
              step:req.body.step,
              issubtype:req.body.issubtype,
              pricemain:[0],
              price_lowest:0,
              price_heighest:0,
              images:[],
              videos:[],
              meta_title:req.body.name,
              meta_desc:req.body.name,
              meta_key:''
              // attributedata:attributedata,
              // configproductarray:[],
              // configproducts:[]
            }

            Product.create(entrydata,(err,data)=>{
              res.json({
                response:true,
                data
              })
            })
          }



          if(req.body.type==='Simple'){
            var entrydata={
              status:req.body.status,
              // type:req.body.type,
              type:'Simple',
              url:req.body.url,
              is_parent:'Yes',
              sku:req.body.sku,
              name:req.body.name,
              step:req.body.step,
              issubtype:req.body.issubtype,
              pricemain:[0],
              price_lowest:0,
              price_heighest:0,
              images:[],
              videos:[],
              meta_title:req.body.name,
              meta_desc:req.body.name,
              meta_key:'',
              config_attribues:{}
              // myattributes:[],
            }

            Product.create(entrydata,(err,data)=>{
              res.json({
                response:true,
                data
              })
            })
          }





        }else{
          res.json({
            response:false,
            message:'url_available'
          })
        }
      })

    }else{
      res.json({
        response:false,
        message:'sku_available'
      })
    }
  })



}



//CREATE STEP 2


function generateProduct(attributedata,parent){


  var datas=[];

  //1 PRODUCT
  if(attributedata.length===1){

      console.log(attributedata)
      attributedata[0].values.forEach((item0, i1) => {

          var dts={
            order:0,
            status:'Active',
            config_added_status:'active',
            type:'ConfigurableChild',
            url:parent.url+'-'+item0.toLowerCase(),
            is_parent:'No',
            parent_id:parent._id,
            images:[],
            videos:[],
            sku:parent.sku+'-'+attributedata[0].valuesnames[i1].toLowerCase(),
            name:parent.name+' '+attributedata[0].valuesnames[i1],
            stock:0,
            pricemain:[0],
            pricedisplay:0,
            pricetemp:0,
            totalconfigattribute:item0,
            [attributedata[0].name]:item0,
            config_attribues:{
              [attributedata[0].name]:item0
            }
          }
          datas.push(dts);
      });
  }

  //2 PRODUCT
  if(attributedata.length===2){
    console.log(attributedata)

    attributedata[0].values.forEach((item0, i0) => {
      attributedata[1].values.forEach((item1, i1) => {
          var dts={
            order:0,
            status:'Active',
            config_added_status:'active',
            type:'ConfigurableChild',
            url:parent.url+'-'+item0.toLowerCase()+'-'+item1.toLowerCase(),
            is_parent:'No',
            parent_id:parent._id,
            images:[],
            videos:[],
            sku:parent.sku+'-'+attributedata[0].valuesnames[i0].toLowerCase()+'-'+attributedata[1].valuesnames[i1].toLowerCase(),
            name:parent.name+' '+attributedata[0].valuesnames[i0]+' '+attributedata[1].valuesnames[i1],
            stock:0,
            pricemain:[0],
            pricedisplay:0,
            pricetemp:0,
            totalconfigattribute:item0+'-'+item1,
            [attributedata[0].name]:item0,
            [attributedata[1].name]:item1,
            config_attribues:{
              [attributedata[0].name]:item0,
              [attributedata[1].name]:item1,
            }
          }
          datas.push(dts);
      });
    });
  }


  //3 PRODUCT
  if(attributedata.length===3){
    attributedata[0].values.forEach((item0, i0) => {
      attributedata[1].values.forEach((item1, i1) => {
        attributedata[2].values.forEach((item2, i2) => {

          var dts={
            order:0,
            status:'Active',
            config_added_status:'active',
            type:'ConfigurableChild',
            url:parent.url+'-'+item0.toLowerCase()+'-'+item1.toLowerCase()+'-'+item2.toLowerCase(),
            is_parent:'No',
            parent_id:parent._id,
            images:[],
            videos:[],
            sku:parent.sku+'-'+attributedata[0].valuesnames[i0].toLowerCase()+'-'+attributedata[1].valuesnames[i1].toLowerCase()+'-'+attributedata[2].valuesnames[i2].toLowerCase(),
            name:parent.name+' '+attributedata[0].valuesnames[i0]+' '+attributedata[1].valuesnames[i1]+' '+attributedata[2].valuesnames[i2],
            stock:0,
            pricemain:[0],
            pricedisplay:0,
            pricetemp:0,
            totalconfigattribute:item0+'-'+item1+'-'+item2,
            [attributedata[0].name]:item0,
            [attributedata[1].name]:item1,
            [attributedata[2].name]:item2,
            config_attribues:{
              [attributedata[0].name]:item0,
              [attributedata[1].name]:item1,
              [attributedata[2].name]:item2,
            }
          }
          datas.push(dts);

        });
      });
    });
  }


  //4 PRODUCT
  if(attributedata.length===4){
    attributedata[0].values.forEach((item0, i0) => {
      attributedata[1].values.forEach((item1, i1) => {
        attributedata[2].values.forEach((item2, i2) => {
          attributedata[3].values.forEach((item3, i3) => {


            var dts={
              order:0,
              status:'Active',
              config_added_status:'active',
              type:'ConfigurableChild',
              url:parent.url+'-'+item0.toLowerCase()+'-'+item1.toLowerCase()+'-'+item2.toLowerCase()+'-'+item3.toLowerCase(),
              is_parent:'No',
              parent_id:parent._id,
              images:[],
              videos:[],
              sku:parent.sku+'-'+attributedata[0].valuesnames[i0].toLowerCase()+'-'+attributedata[1].valuesnames[i1].toLowerCase()+'-'+attributedata[2].valuesnames[i2].toLowerCase()+'-'+attributedata[3].valuesnames[i3].toLowerCase(),
              name:parent.name+' '+attributedata[0].valuesnames[i0]+' '+attributedata[1].valuesnames[i1]+' '+attributedata[2].valuesnames[i2]+' '+attributedata[3].valuesnames[i3],
              stock:0,
              pricemain:[0],
              pricedisplay:0,
              pricetemp:0,
              totalconfigattribute:item0+'-'+item1+'-'+item2+'-'+item3,
              [attributedata[0].name]:item0,
              [attributedata[1].name]:item1,
              [attributedata[2].name]:item2,
              [attributedata[3].name]:item3,
              config_attribues:{
                [attributedata[0].name]:item0,
                [attributedata[1].name]:item1,
                [attributedata[2].name]:item2,
                [attributedata[3].name]:item3,
              }
            }
            datas.push(dts);

          });
        });
      });
    });
  }

  return datas;
}








const create2config = (req,res) => {

  //ATTRIBUTE GENERATES FOR PARENT
  // var myattributes=[];

  var config_attribues={};

  req.body.attributedata.forEach((itemad, i) => {
    var name=itemad.name;
    var value=itemad.values;
    // var temp_name=itemad.valuesnames;
    // var
    // myattributes.push({[name]:value})

    config_attribues[name]=value

  });

  console.log(req.body.attributedata)
  //==========MAIN START==========//
  // const update1 = { configproductarray: allarray, step:'step3config',attributedata:req.body.attributedata,myattributes };
  const update1 = { step:'step3config',config_attribues };
  update2 = Object.assign(update1,config_attribues);

  // console.log(update2)

  Product.findOneAndUpdate({_id:req.body._id},update2)
  .then(parentdata=>{

    //GENERATE CONFIG PRODUCTS
    var getdata=generateProduct(req.body.attributedata,parentdata)


    //DELETE PREVIOUS ATTRIBUTE PRODUCTS
    Product.find({parent_id:parentdata._id}).remove().exec(function(err, deletedatas) {
      console.log('deleted_old_data')

      //INSERT NEW ATTRIBUTE PRODUCTS
      Product.create(getdata)
      .then(create=>{
        console.log('inserted_new_attribute')
      })

    })
  })


  res.json({
    response:true,
    datas:req.body
  })
}


//CHECK ID IS CORRECT OR NOT
const checkproductid = (req,res) => {
  Product.findOne({_id:req.params.id},(err,data)=>{
    if(data===undefined){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data
      })
    }
  })
}



//GET ALL CONFIG PRODUCT LIST UNDER PARENT
const configproductparentchildboth = (req,res) => {

  Product.findOne({_id:req.params.parent_id},(err,parentdata)=>{
    if(!err){


      Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:req.params.parent_id},(err1,childdata)=>{
        if(!err1){

          res.json({
            response:true,
            total:childdata.length,
            parentdata,
            childdata
          })

        }else{
          res.json({
            response:false,
            message:'childdata_data_error'
          })
        }
      })


    }else{
      res.json({
        response:false,
        message:'parent_data_error'
      })
    }
  })


  // Product.findById(req.params.parent_id)
  // .then(parentdata=>{
  //
  //   console.log(parentdata)
  //
  //   // Product.find({type:'Configurable',is_parent:'No',parent_id:req.params.parent_id})
  //   // .then(childdata=>{
  //   //   res.json({
  //   //     response:true,
  //   //     total:childdata.length,
  //   //     parentdata,
  //   //     childdata
  //   //   })
  //   //   console.log(response)
  //   // })
  //
  // })

}


//ADD PRODUCT IMAGE
const productimageadd = (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "products.jpg",
      useUniqueFileName: true,
      folder: "product_images",
    })
    .then((response) => {

      var ins_data={
        fileId:response.fileId,
        filePath:response.filePath,
        size:response.size,
        url:response.url,
      }

      Product.findByIdAndUpdate(req.body.product_id,{$push:{images:ins_data}})
      .then(response=>{

        Product.findById(req.body.product_id)
        .then(datas=>{
          res.json({
            response: true,
            data: datas,
          });
        })

      })

    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });

};


//DELETE PRODUCT
const deleteproduct = (req,res) => {
  Product.findByIdAndDelete(req.params.id,(err,doc)=>{

    if(!err){
      res.json({
        response:true
      })
    }else{
      res.josn({
        response:false
      })
    }

    //delete images
    if(doc.images.length>0){
      doc.images.forEach((item, i) => {
        imagekit
          .deleteFile(item.fileId)
      });
    }



  })
}


//UPDTE IMAGE JSON
const updateimagejson = (req,res) => {
  imagekit
    .deleteFile(req.body.image.fileId)
    .then((response) => {

      Product.findByIdAndUpdate(req.body.product_id,{$set:{images:req.body.images}})
      .then(response=>{

        Product.findById(req.body.product_id)
        .then(datas=>{
          res.json({
            response: true,
            data:datas
          });
        })

      })

    })
    .catch((error) => {
      console.log(error);
    });
}



//UPDATE CONFIG PRODUCT IMAGE STATUS
const updateconfigproductimagestatus = (req,res) => {

  // console.log(req.body)

  Product.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}






//CONFIG PRODUCT FIRST IMAGE ADD
const productsingleimageaddconfig = (req,res) => {
  // const encoded = req.file.buffer.toString("base64");
  //
  // imagekit
  //   .upload({
  //     file: encoded,
  //     fileName: "products.jpg",
  //     useUniqueFileName: true,
  //     folder: "product_config_images",
  //   })
  //   .then((response) => {
  //
  //     var ins_data={
  //       fileId:response.fileId,
  //       filePath:response.filePath,
  //       size:response.size,
  //       url:response.url,
  //     }
  //
  //     Product.findByIdAndUpdate(req.body.product_id,{$push:{images:ins_data}})
  //     .then(response=>{
  //       res.json({
  //         response: true,
  //         data: response,
  //       });
  //     })
  //
  //   })
  //   .catch((error) => {
  //     res.json({
  //       response: error,
  //     });
  //   });
}




const addnewconfigattribute = (req,res) => {

  Product.create(req.body.totdata)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })

}


const savesortingattributeproducts =(req,res) => {


  req.body.datas.forEach((item, i) => {
    item.order=i;
    Product.findByIdAndUpdate(item._id,item)
    .then(response=>{
      if(i===req.body.datas.length-1){
        res.json({
          response:true,
        })
      }
    })
  });
}



const updateconfigproductwithparent =(req,res) => {
  Product.findByIdAndUpdate(req.body._id,req.body.data)
  .then(resas=>{
    console.log('Success')
    // res.json({
    //   response:true
    // })
  })

  req.body.childdata.forEach((item, i) => {
    item.order=i;
    Product.findByIdAndUpdate(item._id,item)
    .then(response=>{
      if(i===req.body.childdata.length-1){

        res.json({
          response:true,
        })
      }
    })
  });

}


const updatesimpleproduct = (req,res) => {


  Product.findByIdAndUpdate(req.body._id,req.body.data)
  .then(resas=>{
    res.json({
      response:true
    })
  })
}


const searchproduct = async (req,res) => {

  console.log(req.body)

  var page= req.body.page;

  var showpage = page-1;
  var perPage = req.body.perpage
  , page = showpage > 0 ? showpage : 0

  Product
    .find({status:'Active',type:['Configurable','Simple'],"$or": [ { "name" : { $regex: req.body.value, $options: 'i' }}, { "sku" : req.body.value }, { "tags" : { $regex: req.body.value, $options: 'i' }} ]})
    // .select('name')
    .limit(perPage)
    .skip(perPage * page)
    .sort({_id: 'desc'})
    .exec(function (err, datas) {
      Product.find({status:'Active',type:['Configurable','Simple'],"$or": [ { "name" : { $regex: req.body.value, $options: 'i' }}, { "sku" : req.body.value }, { "tags" : { $regex: req.body.value, $options: 'i' }}]}).count().exec(function (err, count) {
        res.json({
          value:req.body.value,
          datas: datas,
          page: page+1,
          perpage:req.body.perpage,
          pages: Math.ceil(count / perPage),
          tot:count
        })
      })
    })




}






const dummyentry = (req,res) => {

  // var data={"showImagesInConfigProducts":false,"product_collection":"","product_labels":"","product_brand":"","stock":0,"status":"Active","type":"Simple","url":"dummy","is_parent":"Yes","sku":"565621123","name":"Anubias Nana Petite on Lava Rock","step":"step2simple","issubtype":"No","pricemain":[1400],"price_lowest":1400,"price_heighest":1400,"images":[{"fileId":"63379069bf51c1dc8056a88d","filePath":"/product_images/products_zlmJtZJx5.jpg","size":156353,"url":"https://ik.imagekit.io/nextjsecommerce/product_images/products_zlmJtZJx5.jpg","chosen":false,"selected":false},{"fileId":"633790c0bf51c1dc8058b06d","filePath":"/product_images/products_R-SoWnhqZ.jpg","size":156353,"url":"https://ik.imagekit.io/nextjsecommerce/product_images/products_R-SoWnhqZ.jpg","chosen":false,"selected":false},{"fileId":"633790cbbf51c1dc80593a96","filePath":"/product_images/products_8EoeOSahu.jpg","size":156353,"url":"https://ik.imagekit.io/nextjsecommerce/product_images/products_8EoeOSahu.jpg","chosen":false,"selected":false}],"videos":[],"meta_title":"Anubias Nana Petite on Lava Rock","meta_desc":"Anubias Nana Petite on Lava Rock","meta_key":"","category":["63328bf97bc0e4612c488c6f"],"subcategory":["63328c067bc0e4612c488c77"],"childcategory":[],"product_tax":[],"description":"<p>qwdqw</p>\n","pricedisplay":1500}
  //
  // for(var i = 0;i<1990;i++){
	// // loop code here
  // Product.create(data)
  // .then(e=>{
  //   console.log('success')
  // })
  //
  // console.log(i)
  // }


  /////////////////////


  // Product.remove({url: 'dummy'}, function(err){
  //   if(err){
  //     console.log(err)
  //   }else{
  //     res.json({
  //       response:true
  //     })
  //   }
  // });





}


module.exports = {
  index,
  singleproductinformation,
  allproducts,
  productsearch,
  showallproductspagination,
  create1,
  create2config,
  checkproductid,
  configproductparentchildboth,
  productimageadd,
  deleteproduct,
  updateimagejson,
  productsingleimageaddconfig,
  updateconfigproductimagestatus,
  addnewconfigattribute,
  savesortingattributeproducts,
  updateconfigproductwithparent,
  productsearchfinal,
  updatesimpleproduct,
  viewproductinfo,
  searchproduct,
  dummyentry,
  viewurl
};
