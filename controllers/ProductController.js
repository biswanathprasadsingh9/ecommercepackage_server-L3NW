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









  // ////DYMANIC SEARCH QUERY FOR OTHER ATTRIBUTES////
  // // var getbody = req.body.myattributes;
  // var getOtherAttributes = req.body.search_other_attributes;
  // // var getMainAttributes = req.body.search_main_attributes;
  //
  //
  // var searchData=[]
  // var objectkeys=Object.keys(getOtherAttributes);
  // objectkeys.forEach((item, i) => {
  //   if(getOtherAttributes[item].length>0){
  //     searchData.push({fieldName:'myattributes.'+item,value:getOtherAttributes[item]})
  //   }
  // });
  //
  // // var objectkeys=Object.keys(getMainAttributes);
  // // objectkeys.forEach((item, i) => {
  // //   if(getMainAttributes[item].length>0){
  // //     searchData.push({fieldName:item,value:getMainAttributes[item]})
  // //   }
  // // });


  ////PAGINATION////
  var page= req.body.pagination_page_number;

  var showpage = page-1;
  var perPage = req.body.pagination_datas_per_page
  , page = showpage > 0 ? showpage : 0


  // var findQuery={status:'Active',type:['Configurable','Simple'],$or:[{"pricemain":{"$gte": req.body.search_price_min,"$lte": req.body.search_price_max}}]};
  //
  //
  // //SEARCH
  // // var query = Product.find(findQuery).sort({"name":-1}).limit(perPage).skip(perPage * page);
  // var query = Product.find(findQuery).sort(req.body.search_sortby).limit(perPage).skip(perPage * page);
  //
  // var filters=searchData;
  // for (var i = 0; i < filters.length; i++) {
  //     query.where(filters[i].fieldName).in(filters[i].value)
  // }
  //
  // //===FILTER CATEGORY SUBCATEGORY CHILDCATEGORY HERE
  // if(req.body.search_main_attributes.category.length>0){
  //   query.where('category').in(req.body.search_main_attributes.category)
  // }
  // if(req.body.search_main_attributes.subcategory.length>0){
  //   query.where('subcategory').in(req.body.search_main_attributes.subcategory)
  // }
  // if(req.body.search_main_attributes.childcategory.length>0){
  //   query.where('childcategory').in(req.body.search_main_attributes.childcategory)
  // }
  // if(req.body.search_main_attributes.Closure.length>0){
  //   query.where('Closure').in(req.body.search_main_attributes.Closure)
  // }
  // if(req.body.search_main_attributes.Neck.length>0){
  //   query.where('Neck').in(req.body.search_main_attributes.Neck)
  // }
  // // if(req.body.search_main_attributes['6307a2377fcf4613a88f98f9'].length>0){
  // //   query.where('6307a2377fcf4613a88f98f9').in(req.body.search_main_attributes['6307a2377fcf4613a88f98f9'])
  // // }
  // // query.where('category').in(['Fish'])
  // // query.where('subcategory').in(req.body.search_main_attributes.subCategory)
  // // query.where('childcategory').in(req.body.search_main_attributes.childCategory)
  //
  //
  // query.exec(async function(err,doc){
  //
  //       ////PAGINATION QUERY////
  //       var query_paginaton = Product.find(findQuery);
  //       var filters_paginaton=searchData;
  //       for (var i = 0; i < filters_paginaton.length; i++) {
  //           query_paginaton.where(filters_paginaton[i].fieldName).in(filters_paginaton[i].value)
  //       }
  //
  //       //===FILTER CATEGORY SUBCATEGORY CHILDCATEGORY HERE
  //       if(req.body.search_main_attributes.category.length>0){
  //         query_paginaton.where('category').equals(req.body.search_main_attributes.category)
  //       }
  //       if(req.body.search_main_attributes.subcategory.length>0){
  //         query_paginaton.where('subcategory').equals(req.body.search_main_attributes.subcategory)
  //       }
  //       if(req.body.search_main_attributes.childcategory.length>0){
  //         query_paginaton.where('childcategory').equals(req.body.search_main_attributes.childcategory)
  //       }
  //       if(req.body.search_main_attributes.Closure.length>0){
  //         query_paginaton.where('Closure').in(req.body.search_main_attributes.Closure)
  //       }
  //       if(req.body.search_main_attributes.Neck.length>0){
  //         query_paginaton.where('Neck').in(req.body.search_main_attributes.Neck)
  //       }
  //       // if(req.body.search_main_attributes['6307a2377fcf4613a88f98f9'].length>0){
  //       //   query_paginaton.where('6307a2377fcf4613a88f98f9').in(req.body.search_main_attributes['6307a2377fcf4613a88f98f9'])
  //       // }
  //       // query.where('Skin Type').in(req.body.search_main_attributes['Skin Type'])
  //
  //       query_paginaton.exec(async function (errs, data2) {
  //
  //
  //
  //       //   res.json({
  //       //     response: true,
  //       //     page_number: page+1,
  //       //     total_pages: Math.ceil(data2.length / perPage),
  //       //     total_datas:data2.length,
  //       //     datas_per_page:perPage,
  //       //     datas: doc,
  //       //     price_slider:{
  //       //       max:data2.length>0? _.maxBy(data2, function(o) { return o.price_heighest }).price_heighest:0,
  //       //       min:data2.length>0?_.minBy(data2, function(o) { return o.price_lowest }).price_lowest:0,
  //       //     },
  //       //
  //       //     main_attributes:{ //---normal attribute
  //       //       category:await query_paginaton.distinct("category"),
  //       //       subcategory:await query_paginaton.distinct("subcategory"),
  //       //       childcategory:await query_paginaton.distinct("childcategory"),
  //       //       // ['Skin Type']:await query_paginaton.distinct("Skin Type"),
  //       //       // Neck:await query_paginaton.distinct("Neck"),
  //       //       // '6307a2377fcf4613a88f98f9':await query_paginaton.distinct("6307a2377fcf4613a88f98f9"),
  //       //     },
  //       //     other_attributes:{ //---config attribute
  //       //       Group:await query_paginaton.distinct("myattributes.Group"),
  //       //       Color:await query_paginaton.distinct("myattributes.Color"),
  //       //       // Size:await query_paginaton.distinct("myattributes.Size"),
  //       //     }
  //       //   })
  //       })
  //
  //
  //       ////PAGINATION QUERY////
  //
  // });


  ///////////////////////////////////////////////////////////////////////////////////////


  console.log(req.body)

  var searchQuery = {
    "status":'Active',
    "type": { "$in": [ 'Configurable', 'Simple' ] },
    "pricemain":{"$gte": req.body.search_price_min,"$lte": req.body.search_price_max},

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
  query.select({ _id: 1, name: 1, type:1, price_lowest: 1, price_heighest: 1, images: { $slice: -1 } });
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
            // product_brand: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$product_brand" },{ $sortByCount: "$product_brand" }]),
            category: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$category" },{ $sortByCount: "$category" }]),
            subcategory: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$subcategory" },{ $sortByCount: "$subcategory" }]),
            childcategory: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$childcategory" },{ $sortByCount: "$childcategory" }]),
            '63329659a7f02029b877a5ce': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63329659a7f02029b877a5ce" },{ $sortByCount: "$63329659a7f02029b877a5ce" }]), //size
            '633296fea7f02029b877a5d2': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$633296fea7f02029b877a5d2" },{ $sortByCount: "$633296fea7f02029b877a5d2" }]), //size
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
  viewproductinfo
};
