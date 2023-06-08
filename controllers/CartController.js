const response = require("express");

var notificationList = require("./notificationList");
var jsonDecrypt = require("./jsonDecrypt");
var jsonEncrypt = require("./jsonEncrypt");

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Notification = require("../models/Notification");

const addcheckcart = (req,res) => {
  res.json({
    response:true
  })
}


//<<<=== get cart items ===>>>
const getcartitems = (req,res) => {
    Cart.find({system_id:req.params.system_id,user_id:null})
    .then(resdata=>{

      if(resdata.length===0){
            Cart.find({user_id:req.params.user_id})
              .sort({ _id: -1 })
              .populate('user_id',['name','email'])
              .populate({
                path: 'parent_product_id',
                // select: 'url product_tax images',
                select: { _id: 1, url: 1, product_tax: 1,showImagesInConfigProducts:1, images: { $slice: 1 }, category:1, subcategory:1, childcategory:1 },
                populate: [
                {
                  path: 'product_tax',
                  model: 'Tax',
                }]
             })
              .populate('product_id',['name','sku','pricemain','stock','images','url','minimum_order','maximum_order'])
              // .sort({ _id: -1 })
              .then((response) => {
                res.json({
                  response: true,
                  datas:jsonEncrypt.encrypt(response),

                  // datas: response,
                });
              });
      }else{

        resdata.forEach((item, i) => {


          //check record is already in user cart or not
          Cart.findOne({user_id:req.params.user_id,product_id:item.product_id},(err,doc)=>{
            if(doc===null){


              Cart.findByIdAndUpdate(item._id,{$set:{ user_id:req.params.user_id}})
              .then(aasas=>{
                    if(resdata.length===i+1){
                      callData123();
                    }

                    Notification.create({user_id:req.params.user_id,message:'notification_new_cart_item',info_id:aasas._id,info_url:`/users/${req.params.user_id}?tab=cartitems`})
                    .then(resasac=>{
                      console.log('created_notification');
                    })

              })

            }else{
              Cart.findByIdAndRemove(item._id)
              .then(asa=>{
                console.log('deleted_duplicate');
                if(resdata.length===i+1){
                  callData123();
                }

              })
            }
          })




          function callData123(){
            // if(resdata.length===i+1){
              Cart.find({user_id:req.params.user_id})
                .sort({ _id: -1 })
                .populate('user_id',['name','email'])
                .populate({
                  path: 'parent_product_id',
                  // select: 'url product_tax images',
                  select: { _id: 1, url: 1, product_tax: 1,showImagesInConfigProducts:1, images: { $slice: 1 }, category:1, subcategory:1, childcategory:1 },
                  populate: [
                  {
                    path: 'product_tax',
                    model: 'Tax',
                  }]
               })
                .populate('product_id',['name','sku','pricemain','stock','images','url','minimum_order','maximum_order'])
                // .sort({ _id: -1 })
                .then((response) => {
                  res.json({
                    response: true,
                    datas:jsonEncrypt.encrypt(response),

                  });
                });
            // }
          }

          // if(resdata.length===i+1){
          //
          // }

        });




      }
    })
}

//<<<=== show cart items(without login) ===>>>
const getcartitemsnologin = (req,res) => {
  Cart.find({system_id:req.params.system_id})
    .sort({ _id: -1 })
    // .populate('user_id',['name','email'])
    // .populate('product_id',['name','sku','pricemain','stock','images','url'])
    .populate('user_id',['name','email'])
    .populate({
      path: 'parent_product_id',
      // select: 'url product_tax images',
      select: { _id: 1, url: 1, product_tax: 1,showImagesInConfigProducts:1, images: { $slice: 1 }, category:1, subcategory:1, childcategory:1 },
      populate: [
      {
        path: 'product_tax',
        model: 'Tax',
      }]
   })
    .populate('product_id',['name','sku','pricemain','stock','images','url','minimum_order','maximum_order'])
    // .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas:jsonEncrypt.encrypt(response),

      });
    });
}


//<<<=== remove item ===>>>
const remove = (req,res) => {
  console.log(req.params.id)
  Cart.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

//<<<=== add item to cart from cart web page ===>>>

const addtocart2 = (req,res) => {

  Cart.findById(req.body.cart_item_id,(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'Failed'
      })
    }else{

      Product.findById(doc.product_id,(err1,product)=>{

        if(product===null){
          res.json({
            response:false,
            message:'Product Removed'
          })

        }else{

          var total_stock=product.stock;
          var request_quantity=req.body.new_qty;

          if(total_stock>=request_quantity){

            const update = { quantity: request_quantity };
            Cart.findByIdAndUpdate(req.body.cart_item_id,update)
            .then(resupd=>{
              res.json({
                response:true,
                body:req.body,
                product,
                message:'Success'
              })
            })

          }else{

            res.json({
              response:false,
              message:`Sorry only ${total_stock} available`
            })

          }

        }

      })

    }

  })

}


//<<<=== not needed ===>>>
const gencartitemlocal = (req,res) => {

  Product.findById(req.body.product_id,(err,doc)=>{
    if(!err){
      if(doc===null){
        res.json({
          response:false,
          message:'Product not found'
        })
      }else{

        if(doc.type==='Simple'){

          var genproduct = {product_id:doc._id,price:doc.pricemain[0],name:doc.name};
          res.json({
            response:true,
            in_stock:doc.stock===0?false:true,
            stock:doc.stock,
            genproduct
          })
          // var genproduct={}


        }

        if(doc.type==='Configurable'){

        }

      }
    }else{
      res.json({
        response:false,
        message:'Failed try again'
      })
    }
  })
}

//<<<=== store cart items ===>>>
const store = (req,res) => {

  if(req.body.login){
    Cart.findOne({user_id:req.body.user_id,product_id:req.body.product_id},(err,doc)=>{
      if(err){
        res.json({
          response:false,
          message:'Failed please try again'
        })
      }else{
        if(doc===null){

          Cart.create(req.body)
          .then(response=>{

            Notification.create({user_id:req.body.user_id,message:'notification_new_cart_item',info_id:response._id,info_url:`/users/${req.body.user_id}?tab=cartitems`})
            .then(resasac=>{
              console.log('created_notification');
            })

            res.json({
              response:true
            })
          })
        }else{
          res.json({
            response:false,
            message:'Already in your cart'
          })
        }
      }
    })
  }else{
    Cart.findOne({system_id:req.body.system_id,product_id:req.body.product_id},(err,doc)=>{
      if(err){
        res.json({
          response:false,
          message:'Failed please try again'
        })
      }else{
        if(doc===null){
          Cart.create(req.body)
          .then(response=>{
            res.json({
              response:true
            })
          })
        }else{
          res.json({
            response:false,
            message:'Already in your cart'
          })
        }
      }
    })
  }


  // Cart.findOne({user_id:req.body.user_id,product_id:req.body.product_id},(err,doc)=>{
  //   if(err){
  //     res.json({
  //       response:false,
  //       message:'Failed please try again'
  //     })
  //   }else{
  //     if(doc===null){
  //       Cart.create(req.body)
  //       .then(response=>{
  //         res.json({
  //           response:true
  //         })
  //       })
  //     }else{
  //       res.json({
  //         response:false,
  //         message:'Already in your cart'
  //       })
  //     }
  //   }
  // })


}

const admin_setseen_cart = (req,res) => {
  Cart.findByIdAndUpdate(req.params.id,{$set:{isAdminSeen:true}})
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const admin_setseen_all_userscart = (req,res) => {
  Cart.update({user_id:req.params.user_id,isAdminSeen:false}, {$set: { isAdminSeen: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

module.exports = {
  store,addcheckcart,gencartitemlocal,getcartitems,getcartitemsnologin,remove,addtocart2,admin_setseen_cart,admin_setseen_all_userscart
};
