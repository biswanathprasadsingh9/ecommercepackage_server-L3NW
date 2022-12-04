const response = require("express");

const Cart = require("../models/Cart");
const Product = require("../models/Product");

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
                select: 'url product_tax',
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
                  datas: response,
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
                      Cart.find({user_id:req.params.user_id})
                        .sort({ _id: -1 })
                        .populate('user_id',['name','email'])
                        .populate({
                          path: 'parent_product_id',
                          select: 'url product_tax',
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
                            datas: response,
                          });
                        });
                    }
              })

            }else{
              Cart.findByIdAndRemove(item._id)
              .then(asa=>{
                console.log('deleted_duplicate')
              })
            }
          })


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
      select: 'url product_tax',
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
        datas: response,
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


module.exports = {
  store,addcheckcart,gencartitemlocal,getcartitems,getcartitemsnologin,remove,addtocart2
};
