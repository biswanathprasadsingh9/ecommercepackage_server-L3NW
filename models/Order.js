const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const orderSchema = new Schema({
  isAdminSeen:{
    type:Boolean,
    default:false
  },
  is_ordersuccess_page_viewed:{
    type:Boolean,
    default:false,
  },
  ipinfo:{
    type:Object
  },
  deviceinfo:{
    type:Object
  },
  order_id:{
    type:String
  },
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  paypal_payment_token:{
    type:String
  },
  payment_type:{
    type:String
  },
  payment_status:{
    type:String
  },
  order_status:{
    type:String,
    default:1
  },
  user_shipping_address:{
    type:Object
  },
  products:{
    type:Object
  },
  amount_subtotal:{
    type:Number
  },
  amount_taxes:{
    type:Number
  },
  amount_shipping:{
    type:Number
  },
  amount_total:{
    type:Number
  },
  amount_total_final:{
    type:Number
  },
  shipping_method:{
    type:Object
  },
  coupon:{
    type:Object
  },
  shipping_note:{
    type:String
  },
  courier_id:{type:mongoose.Schema.Types.ObjectId,ref:'Courier'},
  courier_tracking_id:{
    type:String,
    default:''
  },
  invoice_pdf:{
    type:String
  },
  invoice_number:{
    type:Number
  },
  // amount_shipping:{
  //   type:Number
  // },
  // amount_total:{
  //   type:Number
  // },
  // amount_total_shipping:{
  //   type:Number
  // },
  // shipping_method:{
  //   type:Object
  // },
  // coupon:{
  //   type:Object
  // },
  // shipping_note:{
  //   type:String
  // },


},{timestamps:true})



// orderSchema.pre("save",function(next){
//     if(this.isNew){
//         this.constructor.find({}).then((result) => {
//             console.log(result)
//             this.id = result.length + 1;
//             next();
//           });
//     }
// })


autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, {
  model: "Order", // collection or table name in which you want to apply auto increment
  field: "invoice_number", // field of model which you want to auto increment
  startAt: 215001, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});





const Order = mongoose.model('Order',orderSchema)
module.exports = Order;





// //for reset value
// forreset = new Order();
// forreset.save(function (err) {
// forreset.nextCount(function(err, count) {
//     forreset.resetCount(function(err, nextCount) {
//     });
// });
// });
