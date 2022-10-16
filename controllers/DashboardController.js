const response = require("express");

const Attribute = require("../models/Attribute");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");
const Brand = require("../models/Brand");




// INDEX
const index = async (req, res) => {
  res.json({
    response:true
  })
};


const dynamicdatas = async (req,res) => {
  res.json({
    attributes: await Attribute.find().select('_id type name attrbutes_list'),
    category: await Category.find().select('_id name url status'),
    subcategory: await SubCategory.find().select('_id category name url status'),
    childcategory: await ChildCategory.find().select('_id category subcategory name url status'),
    product_brand: await Brand.find().select('_id bran_dname'),
  })
}



module.exports = {
  index,dynamicdatas
};
