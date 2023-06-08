const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  status:{
    type:String
  },
  config_added_status:{
    type:String
  },
  type:{
    type:String
  },
  name:{
    type:String
  },
  url:{
    type:String
  },
  parent_id:{
    type:String
  },
  is_parent:{
    type:String
  },
  order:{
    type:Number
  },
  showImagesInConfigProducts:{
    type:Boolean,
    default:false,
  },
  images:{
    type:Object
  },
  videos:{
    type:Object
  },
  added_in_step_2:{
    type:String
  },
  sku:{
    type:String
  },
  return_available:{
    type:String,
    default:'No'
  },
  warranty_available:{
    type:String,
    default:'No'
  },

  minimum_order:{
    type:Number,
    default:1
  },
  maximum_order:{
    type:Number,
    default:5
  },

  category:{
    type:Object,
    default:[]
  },
  // category: [{ type: Schema.ObjectId, ref: 'Category' }], //one to many
  subcategory:{
    type:Object,
    default:[]
  },
  childcategory:{
    type:Object,
    default:[]
  },
  product_collection:{
    type:String,
    default:'New Arrivals'
    // default:''
  },
  product_labels:{
    type:String,
    default:'New'
    // default:''
  },
  // product_tax:{
  //   type:Object,
  //   default:[],
  // },
  product_tax:[{type:mongoose.Schema.Types.ObjectId,ref:'Tax'}],
  product_brand:{
    type:String,
    default:''
    // default:'-'

  },
  issubtype:{
    type:String
  },
  step:{
    type:String
  },
  attributedata:{
    type:Object
  },
  config_attribute:{
    type:Object
  },
  config_attribute_array:{
    type:Object
  },
  stock:{
    type:Number,
    default:1
  },
  pricetemp:{
    type:Number
  },
  pricedisplay:{
    type:Number
  },
  pricemain:{
    type:Object,
  },
  price_lowest:{
    type:Number
  },
  price_heighest:{
    type:Number
  },
  description:{
    type:String
  },
  configproductarray:{
    type:Object
  },
  configproducts:{
    type:Object
  },
  myattributes:{
    type:Object
  },
  config_attribues:{
    type:Object
  },
  totalconfigattribute:{
    type:String
  },
  meta_title:{
    type:String
  },
  meta_desc:{
    type:String,
  },
  meta_key:{
    type:String,
  },
  review_total:{
    type:Number,
    default:0
  },
  review_heighest_star:{
    type:Number,
    default:0
  },
},{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  strict: false
})

const Product = mongoose.model('Product',ProductSchema)
module.exports = Product;
