const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const result = require("dotenv").config();
var paypal = require('paypal-rest-sdk');

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
const StaticData = require("./routes/webstaticdata");
const User = require("./routes/user");
const Brand = require("./routes/brand");
const Category = require("./routes/category");
const SubCategory = require("./routes/subcategory");
const ChildCategory = require("./routes/childcategory");
const Attribute = require("./routes/attribute");
const Product = require("./routes/product");
const Tax = require("./routes/tax");
const Coupon = require("./routes/coupon");
const Shipping = require("./routes/shipping");
const Dashboard = require("./routes/dashboard");
const Cart = require("./routes/cart");
const Seo = require("./routes/seo");
const Order = require("./routes/order");






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






app.get("/paypal", function (req, res) {

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
          "return_url": "http://return.url",
          "cancel_url": "http://cancel.url"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "item",
                  "sku": "item",
                  "price": "1.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "1.00"
          },
          "description": "This is the payment description."
      }]
  };


  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log(payment);

          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.redirect(payment.links[i].href);
            }
          }


          // res.json({
          //   payment
          // })
      }
  });


  // res.json({
  //   response:true
  // })

});







///////////////////////////////
const { Resolver } = require("dns").promises;

const isValidRegexEmail = (email) =>
  /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email) && !/\s/.test(email.trim());

const dnsServers = [
  "1.1.1.1", // Cloudflare
  "1.0.0.1", // Cloudflare
  "8.8.8.8", // Google
  "8.8.4.4", // Google
  "208.67.222.222", // OpenDNS
  "208.67.220.220", // OpenDNS
];

const resolverOptions = {
  timeout: 3000,
  tries: Math.min(4, dnsServers.length),
};

const resolveDNS = async ({ type, value }) => {
  try {
    const resolver = new Resolver(resolverOptions);
    resolver.setServers(dnsServers);

    let addresses;
    switch (type) {
      case "mx":
        addresses = await resolver.resolveMx(value);
        break;
      case "lookup":
        addresses = await resolver.resolve(value);
        break;
      case "ns":
        addresses = await resolver.resolveNs(value);
        break;
      default:
        throw new Error(`Unknown DNS resolve type: ${type}`);
    }

    if (Array.isArray(addresses) && addresses.length > 0) {
      return { isValid: true, addresses };
    } else {
      return { isValid: false, addresses: [] };
    }
  } catch (error) {
    if (["ECONNREFUSED", "ENOTFOUND"].includes(error.code)) {
      return { isValid: false, addresses: [] };
    } else {
      return { isValid: false, addresses: [], error: error };
    }
  }
};

const isValidMxEmail = async (emailAddress = "") => {
  if (typeof emailAddress !== "string") return false;

  emailAddress = emailAddress.toLowerCase();

  if (!isValidRegexEmail(emailAddress)) return false;

  const [, domain] = emailAddress.split("@");
  const { isValid, addresses = [] } = await resolveDNS({
    type: "mx",
    value: domain,
  });

  const hasAddress = addresses.every(({ exchange }) => !!exchange);
  if (!hasAddress) return false;

  return isValid;
};
////////////////////////////////////////////













app.get("/", async (req, res) => {

//   const legit = require('legit');
//
// legit('validemail@qtonix.com')
//   .then(result => {
//     result.isValid ? console.log('Valid!') : console.log('Invalid!');
//     console.log(JSON.stringify(result));
//   })
//   .catch(err => console.log(err));


  res.send("Server is working");


});





app.get("/emaileeee", (req, res) => {
  const nodemailer = require('nodemailer');
  const Email = require('email-templates');

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
      }
    });
    const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
  });

   email.send({
        template: 'testemail',
        message: {
          from:process.env.EMAIL_FROM+' '+process.env.EMAIL_USER,
          to:'biswanathprasadsingh9@gmail.com',
        },
        locals: {
          name:'John Doe',
        }
    }).then(response=>{
      res.json({
        response:true,
        message:'send',
        res:response
      })
    });



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





app.get('/whatsapp', (req,res)=>{

  const accountSid = 'AC47698c5d1a6e08d66b9635bed88aed72';
  const authToken = '55f9adf08154d1e82726a05707a2d10a';
  const client = require('twilio')(accountSid, authToken);

  client.messages
        .create({
           from: 'whatsapp:+18056692951',
           body: 'Hello there!',
           to: 'whatsapp:+919658667287'
         })
        .then(message => console.log(message.sid))
        .catch((error) => {
            console.error(error);
          })

        res.json({
          response:true
        })

})



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

// var subjects = require("subject-extractor")
// console.log(subjects.extractAll("aquariumfishstore"));







//whatsapp
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();


// app.get("/getwhatsappqr", async (req, res) => {


  client.on('qr', qr => {
      // qrcode.generate(qr, {small: true});
  });

  client.on('ready', () => {
      console.log('Client is ready!');


   //    // Number where you want to send the message.
   // const number = "+919090202808";
   //
   //  // Your message.
   // const text = "Hey john";
   //
   //  // Getting chatId from the number.
   //  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
   // const chatId = number.substring(1) + "@c.us";
   //
   // // Sending message.
   // client.sendMessage(chatId, text);

  });


  client.initialize();

// })


app.get("/sendwhmsg", async (req, res) => {




      // Number where you want to send the message.
   const number = "+919090202808";

    // Your message.
   const text = "Hey john";

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
   const chatId = number.substring(1) + "@c.us";

   // Sending message.
   client.sendMessage(chatId, text);

   console.log('done')

})














app.listen(process.env.PORT || 5000, function () {
  console.log(
    "USER Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

app.use("/api/static", StaticData);
app.use("/api/user", User);
app.use("/api/brand", Brand);
app.use("/api/category", Category);
app.use("/api/subcategory", SubCategory);
app.use("/api/childcategory", ChildCategory);
app.use("/api/attribute", Attribute);
app.use("/api/product", Product);
app.use("/api/tax", Tax);
app.use("/api/coupon", Coupon);
app.use("/api/shipping", Shipping);
app.use("/api/dashboard", Dashboard);
app.use("/api/cart", Cart);
app.use("/api/seo", Seo);
app.use("/api/order", Order);
