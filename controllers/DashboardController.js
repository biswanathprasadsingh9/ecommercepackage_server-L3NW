const response = require("express");


const moment = require("moment");


const Attribute = require("../models/Attribute");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const ChildCategory = require("../models/ChildCategory");
const Brand = require("../models/Brand");

const User = require("../models/User");
const Order = require("../models/Order");
const PageVisitRecord = require("../models/PageVisitRecord");
const EmailSendList = require("../models/EmailSendList");
// const User = require("../models/User");






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
    product_brand: await Brand.find().select('_id name'),
  })
}


const admin_dashboard = async(req,res) => {

  // total_earnings: await Order.aggregate([ { $match: { order_status: "7" } }, { $group: { _id: "$order_id", TotalSum: { $sum: "$amount_total_final" } } } ]),



  var xyz = await PageVisitRecord.aggregate([
                                            {
                                              $group: {
                                                _id: "$deviceinfo.browserName",
                                                count: { $sum: 1 }
                                              }
                                            }
                                          ]);


                                                // console.log(xyz)


  const today = moment().endOf('day');
  const days7before=moment().subtract(7,'d');

  res.json({
    section1:{
      total_users: await User.countDocuments(),
      total_orders: await Order.countDocuments(),
      total_pagevisit: await PageVisitRecord.countDocuments(),
      total_emails: await EmailSendList.countDocuments(),
      total_earnings: await Order.aggregate([{ $match: { order_status: "7" } },{$group:{_id:null,totalAmount: { $sum:"$amount_total_final" }}}]),
    },
    last_7days_page_visit:await PageVisitRecord.aggregate([{
                                                    $match:{createdAt: {$gte: days7before.toDate(), $lt: today.toDate()}}
                                                  },
                                                  {
                                                    $group: {
                                                      _id: {$dateToString:{format:"%Y-%m-%d",date:"$createdAt"}},
                                                      Total: { $sum: 1 }
                                                    }
                                                  },
                                                    {$sort: {_id: -1}}
                                                  ]),
    deviceinfo:{
      total_mobile:await PageVisitRecord.aggregate([{ $match: { 'deviceinfo.isMobile': true } },{$group:{_id:'Mobile', Total: { $sum: 1 }}}]),
      total_tablet:await PageVisitRecord.aggregate([{ $match: { 'deviceinfo.isTablet': true } },{$group:{_id:'Tablet', Total: { $sum: 1 }}}]),
      total_desktop:await PageVisitRecord.aggregate([{ $match: { 'deviceinfo.isDesktop': true } },{$group:{_id:'Desktop', Total: { $sum: 1 }}}]),
    },
    browserinfo:await PageVisitRecord.aggregate([
                                              {
                                                $group: {
                                                  _id: "$deviceinfo.browserName",
                                                  Total: { $sum: 1 }
                                                }
                                              }
                                            ])


  })
}


module.exports = {
  index,dynamicdatas,admin_dashboard
};
