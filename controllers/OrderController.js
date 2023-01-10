const response = require("express");
const { uuid } = require('uuidv4');


const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");

const orderid = require('order-id')('key');


// INDEX
const index = (req, res) => {
  res.json({
    response: true,
  });
};


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



module.exports = {
  index,payondelivery,payonpaypal,view,order_complete_view
};