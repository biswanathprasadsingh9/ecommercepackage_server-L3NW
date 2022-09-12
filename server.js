const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const result = require("dotenv").config();

// FOR IMAGEKIT AUTH
const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});
// FOR IMAGEKIT AUTH

// ===DATABASE CONNECTION===
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Failed to connect");
  console.log(err);
});
db.once("open", () => {
  console.log("Successfully Connected");
});
// ===DATABASE CONNECTION===

const User = require("./routes/user");
const Brand = require("./routes/brand");
const Category = require("./routes/category");
const SubCategory = require("./routes/subcategory");
const ChildCategory = require("./routes/childcategory");
const Attribute = require("./routes/attribute");
const Product = require("./routes/product");
const Tax = require("./routes/tax");
const Dashboard = require("./routes/dashboard");









const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 100000,
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
    parameterLimit: 100000,
  })
);

app.use(morgan("dev"));
app.use(cors());

// app.use(express.static(path.join(__dirname, "../renderer/out")));

app.get("/api/imagekitauth", function (req, res) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Server is working");
  // const Product = require("./models/Product");
  //
  //
  // Product.find().populate({ path: 'attributedata' }).lean()
  // .then(response=>{
  //   res.json({
  //     response
  //   })
  // })


});

app.get("/api/test", (req, res) => {

  // https://stackoverflow.com/questions/26820810/mongoose-dynamic-query
  // const Attribute = require("./models/Attribute");
  // https://mongoosejs.com/docs/api/query.html
  // https://stackoverflow.com/questions/52867011/mongoose-check-for-a-value-between-two-numbers


  // var query = Attribute.find();
  // query.where('name').equals('Size');
  // query.where('dropdowndata').equals(['SS']);
  // // query.where('id').equals('223');
  // // query.where('something').equals('high');
  // query.exec(function(err,doc){
  //   console.log(doc)
  //   res.json({
  //     response: "Mahaprasad",
  //     data:doc
  //   });
  // });
  //
  //
  //
  // var query = Attribute.find().select({'updatedAt':0});;
  //
  // var filters = [
  //     {fieldName: "name", value: ['Size', 'Color']},
  //     {fieldName: "dropdowndata", value: ['S']}
  // ];
  //
  // for (var i = 0; i < filters.length; i++) {
  //     query.where(filters[i].fieldName).equals(filters[i].value)
  // }
  //
  // query.exec(function(err,doc){
  //   console.log(doc)
  //   res.json({
  //     response: "Mahaprasad",
  //     data:doc
  //   });
  // });


  // var filters = {
  //     name:['Size', 'Color'],
  //     // dropdowndata:['S']
  // };
  //
  // filters.dropdowndata=['SS']
  //
  // Attribute.find(filters)
  // .then(doc=>{
  //     res.json({
  //       response: "Mahaprasad",
  //       data:doc
  //     });
  // })
});



app.get("/api/test-elementmatch_old", (req, res) => {

  var ProductData = require("./models/Product");

  // ProductData.add({ color: 'Object', colorsa: 'string', pricesas: 'number' });


  // ***********************
  // ProductData.find({configproducts:{$elemMatch:{configname:'Black-XS-A',as:''}}})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     data:response
  //   })
  // })
  // ***********************

  var query = ProductData.find().select({'updatedAt':0});;

  var filters = [
      // {fieldName: "name", value: ['Size', 'Color']},
      {fieldName: "Closure", value: ['Zip']}

      // {fieldName: "myattributes.Group", value: ['s','K']},
      // {fieldName: "myattributes.Group", value: ['s','K']},

      // {fieldName: "myattributes.size", value: ['S']},
      // {fieldName: "myattributes.test", value: ['3']},


  ];

  for (var i = 0; i < filters.length; i++) {
      query.where(filters[i].fieldName).in(filters[i].value)
  }

  query.exec(function(err,doc){
    console.log(doc)
    res.json({
      response: "Mahaprasad",
      data:doc
    });
  });






  // var query = ProductData.find();
  // query.where('myattributes.color').equals(['Red']);
  // query.exec(function(err,doc){
  //   console.log(doc)
  //   res.json({
  //     response: "Mahaprasad",
  //     data:doc
  //   });
  // });





});



app.get("/api/test-elementmatch", async (req, res) => {

  var ProductData = require("./models/Product");

  var searchQuery = {
    status:'Active',
    type:['Configurable','Simple'],
    $or:[{"pricemain":{"$gte": 1111111111,"$lte": 222222222222222}}]
  };
  // if( your_variable !== "" ) {
      // searchQuery["myattributes.Group"] = ['C'];
      // searchQuery["myattributes.Color"] = ['Blue'];

  // }
  // if( your_second_variable !== "" ) {
  //     query["some_other_key"] = your_second_variable;
  // }



  var query2={
    "status":'Active',
    "type": { "$in": [ 'Configurable', 'Simple' ] },
    "pricemain":{"$gte": 0,"$lte": 222222222222222},
    // "category": { "$in": ['Women','Kids'] },
  }


  var doc = await ProductData.find(query2).select({'updatedAt':0});
  // query.exec(async function(err,doc){





    res.json({
      response: "Mahaprasad",
      count:{
        category: await ProductData.aggregate([{ $match: query2 },{ $unwind: "$category" },{ $sortByCount: "$category" }]),
        group: await ProductData.aggregate([{ $match: query2 },{ $unwind: "$myattributes.Group" },{ $sortByCount: "$myattributes.Group" }]),
        color: await ProductData.aggregate([{ $match: query2 },{ $unwind: "$myattributes.Color" },{ $sortByCount: "$myattributes.Color" }]),
      },
      data:doc
    });


});



app.listen(process.env.PORT || 5000, function () {
  console.log(
    "USER Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

app.use("/api/user", User);
app.use("/api/brand", Brand);
app.use("/api/category", Category);
app.use("/api/subcategory", SubCategory);
app.use("/api/childcategory", ChildCategory);
app.use("/api/attribute", Attribute);
app.use("/api/product", Product);
app.use("/api/tax", Tax);
app.use("/api/dashboard", Dashboard);
