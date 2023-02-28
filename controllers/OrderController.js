const response = require("express");
const { uuid } = require('uuidv4');
const pdf2base64 = require('pdf-to-base64');
var notificationList = require("./notificationList");

const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");
const OrderTimeline = require("../models/OrderTimeline");
const Notification = require("../models/Notification");

const fs = require('fs');
const orderid = require('order-id')('key');


// const stripe = require("stripe")(
//   "pk_test_51MD8AXSIiOlaW5i1BefPtJmzjrHGK0Cr6r3XD96QDU3UKq2uSAv1HLGsvPEuEUP7GkGXROt825dPusxN8EE99Mab009ACcVmWX"
// );
const stripe = require('stripe')('sk_test_51MD8AXSIiOlaW5i1h6xvi2zT2cBrTXd29jAjtnRMzYjvdGfFx7O22pkkCiUgEWNcEHIIZX1SvFPzEdiqaPApXcyK007GtLW2ar')

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
  Order.findById(req.params.id).populate('user_id').populate('courier_id')
  .then(response=>{

    OrderTimeline.find({order_id:response._id})
    .then(timelines=>{
      res.json({
        response:true,
        data:response,
        timelines
      })
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

            var timeline_data={
              order_id:response._id,
              name:'1',
            }

            Notification.create({user_id:req.body.user_id,message:notificationList.notification('notification_new_order'),info_id:response._id,info_url:`/orders/${response._id}`})
            .then(resasac=>{
              console.log('created_notification');
            })

            OrderTimeline.create(timeline_data)
            .then(addq=>{
              res.json({
                response:true,
                order_id:tmp_data.order_id
              })
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

// PAY ON STRIPE
const payonstripe = async (req,res) => {

  // var payment_secret_uuid=uuid();
  //
  //
  // const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ["card"],
  //     customer_email: req.body.email,
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: "usd",
  //           product_data: {
  //             name: req.body.product,
  //           },
  //           unit_amount: req.body.totalamount * 100,
  //         },
  //         quantity: 1,
  //         // description: 'My description ...',
  //       },
  //     ],
  //     mode: "payment",
  //     success_url: `http://localhost:3002/ea638decb4661519ea638decb46c8473a8061519ea638decb46c84/61519ea638decb46c8473/638decb46c8473a8061519ea638decb/${req.body.uuid}/38decb46c8473/638decb46c8473a8061519ea6`,
  //     cancel_url: `http://localhost:3002/paymentfailed`,
  //   });
  //
  //   res.redirect(303, session.url);


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
}

const vieworder_byorderid = (req,res) => {
  // Order.findOne({order_id:req.params.order_id})
  // .then(response=>{
  //     if(response===null){
  //       res.json({
  //         response:false,
  //       })
  //     }else{
  //       res.json({
  //         response:true,
  //         data:response
  //       })
  //     }
  // })
  Order.findOne({order_id:req.params.order_id}).populate('user_id').populate('courier_id')
  .then(response=>{

    OrderTimeline.find({order_id:response._id})
    .then(timelines=>{
      res.json({
        response:true,
        data:response,
        timelines
      })
    })


  })
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




const generate_invoice = (req,res) => {
  console.log(req.body)

  //PDF GENERATE
  var pdf = require("pdf-creator-node");
  var fs = require("fs");
  var path = require("path");
  var html = fs.readFileSync(path.join(__dirname, "../pdf_templete/templete.html"), "utf8");

  var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    footer: {
          height: "28mm",
          contents: {
              default: '<span style="float: right;font-size:11px">Page {{page}} of {{pages}}</span>',
          }
      }
  };
  //INVOICE NUMBER
  // var d = new Date();
  // var n = d.valueOf();
  //
  // var invoice_number = 'EX'+n;


  var document = {
    html: html,
    data: {
      invoicedata:req.body,
    },
    path: `./pdf/invoice_${req.body.order_id}.pdf`,
    type: "pdf", // "stream" || "buffer" || "" ("" defaults to pdf)
  };

  console.log(document);
  pdf
  .create(document, options)
  .then((resp) => {
    console.log(resp);

    //convert pdf to base64
    pdf2base64(`./pdf/invoice_${req.body.order_id}.pdf`)
    .then((file64) => {


        //update base64 pdf to database
        Order.findByIdAndUpdate(req.body.id,{$set:{invoice_pdf:file64}})
        .then(resupd=>{


          //delete pdf file from server
          fs.unlink(`./pdf/invoice_${req.body.order_id}.pdf`, function (err1) {
               if (err1) {
                   res.json({
                     response:false,
                   })
               }else{
                 res.json({
                   response:true,
                   data:req.body
                 })
               }
           });

        })
    })
    .catch((errofile64r) => {
      res.json({
        response:false,
      })
    })







  })
  .catch((error) => {
    console.error(error);
  });
  //PDF GENERATE









}





const update_order_status = (req,res) => {
  // try{


  console.log(req.body)

   if(req.body.order_status===1){
     console.log('generate invoice');
   }


    Order.findByIdAndUpdate(req.body.id,req.body)
    .then(response=>{


      var timeline_data={
        order_id:response._id,
        name:req.body.order_status,
      }
      OrderTimeline.create(timeline_data)
      .then(addq=>{
        res.json({
          response:true,
        })
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



const update_order_address = (req,res) => {

  console.log(req.body)

  Order.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    var timeline_data={
      order_id:response._id,
      name:'address_updatedby_admin',
    }
    OrderTimeline.create(timeline_data)
    .then(addq=>{
      res.json({
        response:true,
      })
    })

  })
  .catch(err=>{
    res.json({
      response:false,
      message:'error_query'
    })
  })


}

const pdf_store_test = (req,res)=> {

  const pdf2base64 = require('pdf-to-base64');
pdf2base64("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")
    .then(
        (response) => {
          res.json({
            response:response
          })
            console.log(response); //cGF0aC90by9maWxlLmpwZw==
        }
    )
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )



}


const delete_single_timeline_item = (req,res) => {
  OrderTimeline.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const delete_order = (req,res) => {
  Order.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,vieworder_byorderid,delete_single_timeline_item,delete_order,update_order_address,vieworder,generate_invoice,pdf_store_test,payondelivery,payonstripe,payonpaypal,view,order_complete_view,get_web_user_orderslist,get_web_user_order_details,update_order_status
};
