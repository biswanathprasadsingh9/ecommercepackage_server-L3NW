const response = require("express");
const { uuid } = require('uuidv4');
const pdf2base64 = require('pdf-to-base64');
var notificationList = require("./notificationList");
var emailsender = require("./emailsender");
var emailsenderForOrder = require("./emailsenderForOrder");
var emailsenderAdmin = require("./emailsenderAdmin");
var paypal = require('paypal-rest-sdk');


var numeral = require("./numeral");


const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");
const OrderTimeline = require("../models/OrderTimeline");
const Notification = require("../models/Notification");
const TemporaryPaymentCode = require("../models/TemporaryPaymentCode");
const Payment = require("../models/Payment");



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

    if(response){
      OrderTimeline.find({order_id:response._id})
      .then(timelines=>{

        Order.findByIdAndUpdate(req.params.id,{$set:{isAdminSeen:true}})
        .then(d=>{
          res.json({
            response:true,
            data:response,
            timelines
          })
        })

      }).catch(err=>{
        res.json({
          response:false,
          message:'order_not_found_in_timeline'
        })
      })

    }else{
      res.json({
        response:false,
        message:'order_not_found'
      })
    }

  }).catch(err=>{
    res.json({
      response:false,
      message:'order_not_found'
    })
  })




}


// PAY ON DELIVERY
const payondelivery = (req,res) => {


  console.log(req.body);

  var emaildatas={products:[]};
  emaildatas.shippingaddress=req.body.user_shipping_address;
  emaildatas.amount_subtotal=numeral.toCurrency(req.body.amount_subtotal);
  emaildatas.amount_taxes=numeral.toCurrency(req.body.amount_taxes);
  emaildatas.amount_shipping=numeral.toCurrency(req.body.amount_shipping);
  emaildatas.amount_total=numeral.toCurrency(req.body.amount_total);
  emaildatas.amount_total_final= numeral.toCurrency(req.body.amount_total_final);
  emaildatas.shipping_method=req.body.shipping_method;
  emaildatas.coupon=req.body.coupon?req.body.coupon.name:'-';
  emaildatas.payment_type=req.body.payment_type;
  emaildatas.payment_status=req.body.payment_status;

  req.body.products.forEach((item, i) => {
    emaildatas.products.push({name:item. product_name,quantity:item.quantity,amount:numeral.toCurrency(item.product_price)})
  });



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


            //check if paid then insert payment history
            if(response.payment_status==='Paid'){
              Payment.create({user_id:response.user_id,order_id:response._id,order_code:response.order_id,amount:response.amount_total_final,payment_method:response.payment_type})
              .then(rpas=>{
                console.log('payment_history_created')
              })
            }


            res.json({
              response:true,
              order_id:tmp_data.order_id
            })

            var timeline_data={
              order_id:response._id,
              name:'1',
            }

            //new order notification
            Notification.create({user_id:req.body.user_id,message:'notification_new_order',info_id:response._id,info_url:`/orders/${response._id}`})
            .then(resasac=>{
              console.log('created_notification');
            })

            OrderTimeline.create(timeline_data)
            .then(addq=>{
              console.log('tiline_created');
            })

            //new order email
            User.findById(req.body.user_id)
            .then(user=>{
              emaildatas.username=user.name.split(' ')[0];
              emailsender.emailsendFunction('user_send_thankyou_for_order',user.email,emaildatas,'email_user_thanks_for_order',true,user._id)
              .then(response=>{
                console.log('send user_send_thankyou_for_order');
              })

              //send  to admin
              emailsenderAdmin.emailsendFunction('admin_new_user_order',{datalink:`/orders/${response._id}`,user:user,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_to_admin_new_user_order')
              .then(response=>{
                console.log('send admin_new_user_order');
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

  var payment_secret_uuid=uuid();


  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: 'biswanath@gmail.com',
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: 'Test',
            },
            unit_amount: 11 * 100,
          },
          quantity: 1,
          // description: 'My description ...',
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3002/ea638decb4661519ea638decb46c8473a8061519ea638decb46c84/61519ea638decb46c8473/638decb46c8473a8061519ea638decb/${req.body.uuid}/38decb46c8473/638decb46c8473a8061519ea6`,
      cancel_url: `http://localhost:3002/paymentfailed`,
    });

    res.redirect(303, session.url);


  // User.findByIdAndUpdate(req.body.user_id,{$set:{psuuid:payment_secret_uuid,pcitems:req.body}}) //update payment secret code under user
  // .then(user_update=>{
  //   res.json({
  //     response:true,
  //     uuid:payment_secret_uuid,
  //     datas:req.body
  //   })
  // })


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
  Order.find({user_id:req.params.user_id}).select('order_id products._id payment_type payment_status amount_total_final order_status')
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
  // console.log(req.body)

  console.log('req.body',req.body);

  var emaildatas={products:[]};
  emaildatas.shippingaddress=req.body.user_shipping_address;
  emaildatas.amount_subtotal=numeral.toCurrency(req.body.amount_subtotal);
  emaildatas.amount_taxes=numeral.toCurrency(req.body.amount_taxes);
  emaildatas.amount_shipping=numeral.toCurrency(req.body.amount_shipping);
  emaildatas.amount_total=numeral.toCurrency(req.body.amount_total);
  emaildatas.amount_total_final= numeral.toCurrency(req.body.amount_total_final);
  emaildatas.shipping_method=req.body.shipping_method;
  emaildatas.coupon=req.body.coupon?req.body.coupon.name:'-';
  emaildatas.payment_type=req.body.payment_type;
  emaildatas.payment_status=req.body.payment_status;


  console.log(emaildatas);


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
      emaildatas:emaildatas
    },
    path: `./pdf/invoice_${req.body.order_id}.pdf`,
    type: "pdf", // "stream" || "buffer" || "" ("" defaults to pdf)
  };

  // console.log(document);
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

   // if(req.body.order_status===1){
   //   console.log('generate invoice');
   // }

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



      Order.findById(req.body.id).populate('courier_id user_id')
      .then(orderdetails=>{

        // console.log('orderdetails',orderdetails);


        if(user!==null){
          var user=orderdetails.user_id;

          var emaildatas={};
          emaildatas.username=user.name.split(' ')[0];
          emaildatas.order_id=response.order_id;
          // emaildatas.pdfbase64=

          //order accepted
          if(req.body.order_status=='2'){
            emailsenderForOrder.emailsendFunction('user_order_approved',user.email,emaildatas,'email_user_order_approved',true,user._id)
            .then(response=>{
              console.log('send user_order_approved');
            })
          }

          //order in progress
          if(req.body.order_status=='3'){
            emailsenderForOrder.emailsendFunction('user_order_inprogress',user.email,emaildatas,'email_user_order_inprogress',true,user._id)
            .then(response=>{
              console.log('send user_order_inprogress');
            })
          }

          //order in progress
          if(req.body.order_status=='4'){
            emailsenderForOrder.emailsendFunction('user_order_packing',user.email,emaildatas,'email_user_order_packing',true,user._id)
            .then(response=>{
              console.log('send user_order_packing');
            })
          }

          //order in ready for pickup
          if(req.body.order_status=='5'){
            emailsenderForOrder.emailsendFunction('user_order_readyforpickup',user.email,emaildatas,'email_user_order_readyforpickup',true,user._id)
            .then(response=>{
              console.log('send user_order_readyforpickup');
            })
          }

          //order shipped
          if(req.body.order_status=='6'){

            if(orderdetails.courier_id){ //check if courier available
              emaildatas.courier_tracking_id=orderdetails.courier_tracking_id;
              emaildatas.courier_name=orderdetails.courier_id.name;
              emaildatas.courier_url=orderdetails.courier_id.tracking_url;

              emailsenderForOrder.emailsendFunction('user_order_shipped',user.email,emaildatas,'email_user_order_shipped',true,user._id)
              .then(response=>{
                console.log('send user_order_shipped');
              })
            }
          }

          //order in ready for pickup
          if(req.body.order_status=='7'){
            emailsenderForOrder.emailsendFunction('user_order_delivered',user.email,emaildatas,'email_user_order_delivered',true,user._id)
            .then(response=>{
              console.log('send user_order_delivered');
            })
          }

          //order calcelled
          if(req.body.order_status=='0'){
            emailsenderForOrder.emailsendFunction('user_order_cancelled',user.email,emaildatas,'email_user_order_cancelled',true,user._id)
            .then(response=>{
              console.log('send user_order_cancelled');
            })
          }

        }





      }).catch(err=>{
        console.log('error');
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

  // console.log(req.body)

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

const mark_all_seen = (req,res) => {
  Order.update({isAdminSeen:false}, {$set: { isAdminSeen: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const paypal_first = (req,res) => {

  var tmpdata={
    user_id:req.param("user_id"),
    temp_send_code:req.param("temp_send_code"),
  }

  TemporaryPaymentCode.create(tmpdata)
  .then(payment_code=>{


      ///////////////////////////////PAYPAL///////////////////////////////
      paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AY10bLMyZLtP3wVNODGh6mdmzGjc1XxBg7m_s61q07kFvEAfVCDYv_16XsX09KytlrAnCx_VTJTnFf-F',
        'client_secret': 'EKFUR80NNpYESG7u5Au6oC-22noDWM7YzuSomDebJgWr61RqQpFA440NdtWqkbTJ_1CuAtXJ9QwGrVFc'
      });

      // paypal.configure({
      //   'mode': 'live', //sandbox or live
      //   'client_id': 'Ab620lyNESUWkl16w4MPK7HrCACSTTWB1Kd83rGeQAEw_fMiJ6BWbTzii2ZeJrLKU8QsA9p-1D-smjk6',
      //   'client_secret': 'ECozQIybzglUgNq5Kb_QyagjS39vjlEFNjskpLUnWrLGZrDrj60a4ed1ZC0WNcyNKlLCDUnxIDIJtP3R'
      // });


        var create_payment_json = {
          "intent": "sale",
          "payer": {
              "payment_method": "paypal"
          },
          "redirect_urls": {
              "return_url": `${process.env.WEBSITE_URL}/payment?fullload=true&ptype=paypal&uid=${payment_code.user_id}&temp_receive_code=${payment_code.temp_receive_code}`,
              "cancel_url": `${process.env.WEBSITE_URL}/payment`
          },
          "transactions": [{
              "item_list": {
                  "items": [{
                      "name": "ReactNodeEcommerce Payment",
                      "sku": "item",
                      "price": req.param("amount"),
                      "currency": "USD",
                      "quantity": 1
                  }]
              },
              "amount": {
                  "currency": "USD",
                  "total": Number(req.param("amount"))
              },
              "description": "ReactNodeEcommerce product payment"
          }]
      };
      paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
              throw error;
          } else {
              console.log('payment',payment);
              for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                  res.redirect(payment.links[i].href);
                }
              }
          }
      });
      ///////////////////////////////PAYPAL///////////////////////////////
  })
}




const stripe_first = async (req,res) => {

  var tmpdata={
    user_id:req.param("user_id"),
    temp_send_code:req.param("temp_send_code"),
  }

  TemporaryPaymentCode.create(tmpdata)
  .then(async payment_code =>{

      ///////////////////////////////STRIPE///////////////////////////////
      const session = await stripe.checkout.sessions.create({
          // payment_method_types: ["card"],
          // customer_email: 'bis@gmail.com',
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: 'ReactNodeEcommerce Payment',
                },
                unit_amount: req.param("amount") * 100,
              },
              quantity: 1,
              // description: 'My description ...',
            },
          ],
          mode: "payment",
          success_url: `${process.env.WEBSITE_URL}/payment?fullload=true&ptype=stripe&uid=${payment_code.user_id}&temp_receive_code=${payment_code.temp_receive_code}`,
          cancel_url: `${process.env.WEBSITE_URL}/payment`,
        });

        res.redirect(303, session.url);
      ///////////////////////////////STRIPE///////////////////////////////
  })
}




const match_payment_recive_code = (req,res) => {
  TemporaryPaymentCode.findOne({user_id:req.params.user_id,temp_receive_code:req.params.temp_receive_code})
  .then(data=>{
    console.log(data)
    if(data){
      res.json({
        response:true
      })
    }else{
      res.json({
        response:false
      })
    }
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}



const paypal_second = (req,res) => {
  console.log(req.param("paymentId"))

  res.json({
    response:true
  })
}

const payments_useruser = (req,res) => {
  Payment.find({user_id:req.params.user_id}).populate('order_id','name order_id')
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}

const admin_all_paymenthistory = (req,res) => {
  Payment.find({}).populate('order_id','name order_id').populate('user_id','name').sort({ _id: -1 })
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}

module.exports = {
  index,admin_all_paymenthistory,payments_useruser,paypal_first,stripe_first,match_payment_recive_code,paypal_second,vieworder_byorderid,mark_all_seen,delete_single_timeline_item,delete_order,update_order_address,vieworder,generate_invoice,pdf_store_test,payondelivery,payonstripe,payonpaypal,view,order_complete_view,get_web_user_orderslist,get_web_user_order_details,update_order_status
};
