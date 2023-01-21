const response = require("express");
const { uuid } = require('uuidv4');


const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");

const orderid = require('order-id')('key');


// INDEX
const index = (req, res) => {
  Order.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};


const vieworder = (req,res) => {
  Order.findById(req.params.id).populate('user_id',{password:0,createdAt:0,updatedAt:0}).populate('courier_id')
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


// PAY ON DELIVERY
const payondelivery = (req,res) => {

  //***dont delete it will used in paypal paymenty
  // var payment_secret_uuid=uuid();
  // User.findByIdAndUpdate(req.body.user_id,{$set:{psuuid:payment_secret_uuid,pcitems:req.body}}) //update payment secret code under user
  // .then(user_update=>{
  //   res.json({
  //     response:true,
  //     uuid:payment_secret_uuid,
  //     datas:req.body
  //   })
  // })

  // Order.create(req.body)
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     datas:req.body
  //   })
  // })

  // Cart.find({user_id:req.body.user_id},(err,doc)=>{
  //   if(doc!==null){
  //     console.log(doc)
  //   }
  // })

  console.log(req.body)

  Cart.find({user_id:req.body.user_id}).distinct('_id', function(error, ids) {
      if(ids!==undefined){
        console.log(ids)

        Cart.deleteMany({ _id: ids })
        .then(del_ids=>{
          console.log('removed_cart_items')


          const idgen = orderid.generate();
          var tmp_data=req.body;
          tmp_data.order_id=`RNEC${orderid.getTime(idgen)}`

          Order.create(tmp_data)
          .then(response=>{
            res.json({
              response:true,
              order_id:tmp_data.order_id
            })
          })


        })

      }
  });



}


// PAY ON PAYPAL
const payonpaypal = (req,res) => {

  var payment_secret_uuid=uuid();

  User.findByIdAndUpdate(req.body.user_id,{$set:{psuuid:payment_secret_uuid,pcitems:req.body}}) //update payment secret code under user
  .then(user_update=>{
    res.json({
      response:true,
      uuid:payment_secret_uuid,
      datas:req.body
    })
  })


}



//VIEW ORDER DETAILS
const view = (req,res) => {
  // res.json({
  //   response:true,
  //   id:req.params.id
  // })

  Order.findOne({order_id:req.params.order_id})
  .then(response=>{
      if(response===null){
        res.json({
          response:false,
        })
      }else{
        res.json({
          response:true,
          data:response
        })
      }
  })

  // Order.findOne({_id:req.params.id})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     datas:response
  //   })
  // })
}


const order_complete_view = (req,res) => {
  Order.findByIdAndUpdate(req.params.id,{$set:{is_ordersuccess_page_viewed:true}})
  .then(response=>{
    res.json({
      response:true
    })
  })
}


const get_web_user_orderslist = (req,res) => {
  Order.find({user_id:req.params.user_id}).select('order_id products._id payment_type payment_status amount_total_final')
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
}

const get_web_user_order_details = (req,res) => {
  Order.findById(req.params.order_id,(err,doc)=>{
    if(doc===null){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data:doc
      })
    }
  })
}

const update_order_status = (req,res) => {
  // try{
    Order.findByIdAndUpdate(req.body.id,req.body)
    .then(response=>{
      res.json({
        response:true
      })
    })
    .catch(err=>{
      res.json({
        response:false,
        message:'error_query'
      })
    })
  // }catch(e){
  //   res.json({
  //     response:false,
  //     message:'error'
  //   })
  // }


}

module.exports = {
  index,vieworder,payondelivery,payonpaypal,view,order_complete_view,get_web_user_orderslist,get_web_user_order_details,update_order_status
};
