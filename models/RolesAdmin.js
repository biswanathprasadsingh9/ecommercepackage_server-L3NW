const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesAdminSchema = new Schema({

  name:{
    type:String,
  },


  is_view_dashboard:{
    type:Boolean,
    default:true
  },


  user_index:{
    type:Boolean,
    default:true
  },
  user_create:{
    type:Boolean,
    default:true
  },
  user_view:{
    type:Boolean,
    default:true
  },
  user_login_as_user_account:{
    type:Boolean,
    default:true
  },
  user_edit:{
    type:Boolean,
    default:true
  },
  user_delete:{
    type:Boolean,
    default:true
  },


  login_record_index:{
    type:Boolean,
    default:true
  },
  login_record_clear:{
    type:Boolean,
    default:true
  },
  login_record_view:{
    type:Boolean,
    default:true
  },
  login_record_delete:{
    type:Boolean,
    default:true
  },


  email_record_index:{
    type:Boolean,
    default:true
  },
  email_record_view:{
    type:Boolean,
    default:true
  },
  email_record_delete:{
    type:Boolean,
    default:true
  },


  order_record_index:{
    type:Boolean,
    default:true
  },
  order_record_view:{
    type:Boolean,
    default:true
  },
  order_record_update_status:{
    type:Boolean,
    default:true
  },
  order_record_update_courier:{
    type:Boolean,
    default:true
  },
  order_record_update_paymentinfo:{
    type:Boolean,
    default:true
  },
  order_record_update_billingshipping:{
    type:Boolean,
    default:true
  },
  order_record_invoice:{
    type:Boolean,
    default:true
  },
  order_record_edit:{
    type:Boolean,
    default:true
  },
  order_record_delete:{
    type:Boolean,
    default:true
  },


  categorysubchild_record_index:{
    type:Boolean,
    default:true
  },
  categorysubchild_record_view:{
    type:Boolean,
    default:true
  },
  categorysubchild_record_edit:{
    type:Boolean,
    default:true
  },
  categorysubchild_record_delete:{
    type:Boolean,
    default:true
  },


  product_record_index:{
    type:Boolean,
    default:true
  },
  product_record_create:{
    type:Boolean,
    default:true
  },
  product_record_view:{
    type:Boolean,
    default:true
  },
  product_record_edit:{
    type:Boolean,
    default:true
  },
  product_record_delete:{
    type:Boolean,
    default:true
  },


  product_attribute_record_index:{
    type:Boolean,
    default:true
  },
  product_attribute_record_create:{
    type:Boolean,
    default:true
  },
  product_attribute_record_view:{
    type:Boolean,
    default:true
  },
  product_attribute_record_edit:{
    type:Boolean,
    default:true
  },
  product_attribute_record_delete:{
    type:Boolean,
    default:true
  },


  product_reviews_record_index:{
    type:Boolean,
    default:true
  },
  product_reviews_record_create:{
    type:Boolean,
    default:true
  },
  product_reviews_record_view:{
    type:Boolean,
    default:true
  },
  product_reviews_record_edit:{
    type:Boolean,
    default:true
  },
  product_reviews_record_delete:{
    type:Boolean,
    default:true
  },


  tax_record_index:{
    type:Boolean,
    default:true
  },
  tax_record_create:{
    type:Boolean,
    default:true
  },
  tax_record_view:{
    type:Boolean,
    default:true
  },
  tax_record_edit:{
    type:Boolean,
    default:true
  },
  tax_record_delete:{
    type:Boolean,
    default:true
  },


  coupons_record_index:{
    type:Boolean,
    default:true
  },
  coupons_record_create:{
    type:Boolean,
    default:true
  },
  coupons_record_view:{
    type:Boolean,
    default:true
  },
  coupons_record_edit:{
    type:Boolean,
    default:true
  },
  coupons_record_delete:{
    type:Boolean,
    default:true
  },


  brand_record_index:{
    type:Boolean,
    default:true
  },
  brand_record_create:{
    type:Boolean,
    default:true
  },
  brand_record_view:{
    type:Boolean,
    default:true
  },
  brand_record_edit:{
    type:Boolean,
    default:true
  },
  brand_record_delete:{
    type:Boolean,
    default:true
  },


  shipping_record_index:{
    type:Boolean,
    default:true
  },
  shipping_record_create:{
    type:Boolean,
    default:true
  },
  shipping_record_view:{
    type:Boolean,
    default:true
  },
  shipping_record_edit:{
    type:Boolean,
    default:true
  },
  shipping_record_delete:{
    type:Boolean,
    default:true
  },

  // amount:{
  //   type:String
  // },
  // currency_info:{
  //   type:Object
  // }
},{timestamps:true})

const RolesAdmin = mongoose.model('RolesAdmin',rolesAdminSchema)
module.exports = RolesAdmin;
