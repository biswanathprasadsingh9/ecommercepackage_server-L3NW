const response = require("express");
var randomstring = require("randomstring");
const _ = require("lodash");
var SpellCorrector = require('spelling-corrector');
var spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const Notification = require("../models/Notification");
const { ObjectId } = require('mongodb');

const Product = require("../models/Product");
const Attribute = require("../models/Attribute");
const Cart = require("../models/Cart");
const ProductReview = require("../models/ProductReview");

var emailsender = require("./emailsender");
var emailsenderAdmin = require("./emailsenderAdmin");


const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});

// SEO FRIENDLY URL GENERATOR
function ToSeoUrl(url) {
  // make the url lowercase
  var encodedUrl = url.toString().toLowerCase();
  // replace & with and
  encodedUrl = encodedUrl.split(/\&+/).join("-and-")
  // remove invalid characters
  encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");
  // remove duplicates
  encodedUrl = encodedUrl.split(/-+/).join("-");
  // trim leading & trailing characters
  encodedUrl = encodedUrl.trim('-');
  return encodedUrl;
}
// SEO FRIENDLY URL GENERATOR



function mostFrequent(arr) {

  return arr
        .reduce((acc, cur, ind, arr) => {
          if (arr.indexOf(cur) === ind) {
            return [...acc, [cur, 1]];
          } else {
            acc[acc.indexOf(acc.find(e => e[0] === cur))] = [
              cur,
              acc[acc.indexOf(acc.find(e => e[0] === cur))][1] + 1
            ];
            return acc;
          }
        }, [])
        .sort((a, b) => b[1] - a[1])
        .filter((cur, ind, arr) => cur[1] === arr[0][1])
        .map(cur => cur[0]);
}


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


// INDEX
const index = (req, res) => {
  Product.find({type:['Configurable','Simple']})
  // Product.find({type:['Configurable']})
  // Product.find({})
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });






  // //update review
  // Product.find({})
  // .then(products=>{
  //
  //   products.forEach((item, i) => {
  //     // console.log(item)
  //
  //     //for clear review
  //     Product.findByIdAndUpdate(item._id,{$set:{review_total:19,review_heighest_star:5}})
  //     .then(asd=>{
  //       console.log('success',i);
  //     })
  //
  //     // //for update review
  //     // Product.findByIdAndUpdate(item._id,{$set:{review_total:randomIntFromInterval(290,1250),review_heighest_star:randomIntFromInterval(3,5)}})
  //     // .then(asd=>{
  //     //   console.log('success',i);
  //     // })
  //
  //
  //   });
  //   res.json({
  //     response:true
  //   })
  // })







  // // Update Reviews 1
  // Product.find({type:['Configurable','Simple']})
  // .then(products=>{
  //
  //
  //   products.forEach((item, i) => {
  //     // console.log(item)
  //
  //     var demo_reviews=[
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428ec759ddae752f8a5a0d5'),
  //         rating: 5,
  //         comment: "good comfort , light weight, easy to use",
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428ec759ddae752f8a5a0d4'),
  //         rating: 5,
  //         comment: 'Very much comfortable...',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428ec759ddae752f8a5a0d3'),
  //         rating: 5,
  //         comment: 'I purchased it for my son. He is happy with the product.. and using on daily basis',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428ec759ddae752f8a5a0d2'),
  //         rating: 1,
  //         comment: 'Not comfirtable as its looks in photo & Also quility wise poor..',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428ec759ddae752f8a5a0d1'),
  //         rating: 5,
  //         comment: 'If you want good product but low price; this one is for you',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428ec759ddae752f8a5a0d0'),
  //         rating: 2,
  //         comment: 'Ok for daily use 👍',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43339'),
  //         rating: 2,
  //         comment: 'Best quality and gorgeous look',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //
  //
  //
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43338'),
  //         rating:3 ,
  //         comment: 'Good in this price range',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43337'),
  //         rating: 5,
  //         comment: 'Nice product in the reasonable price',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43336'),
  //         rating: 2,
  //         comment: 'High in price',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43335'),
  //         rating: 4,
  //         comment: 'It is a good product go for it',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43334'),
  //         rating: 5,
  //         comment: 'Received exchanged product, and it is a good one and really value for money product',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43333'),
  //         rating: 5,
  //         comment: 'Value for money',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //
  //
  //
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43332'),
  //         rating: 1,
  //         comment: 'Product is not comfortable even looks are below average',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43331'),
  //         rating: 4,
  //         comment: 'Good product in low price',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('6428613754adba46d4e43330'),
  //         rating: 5,
  //         comment: 'Nice product 😊👍',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('64285f85ee39ca4434a14f5f'),
  //         rating: 5,
  //         comment: 'Nice product compare to price and comfortable also overall quality is best',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('64285f85ee39ca4434a14f5e'),
  //         rating: 5,
  //         comment: 'Good quality as expected..',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //       {
  //         isAdminSeen: true,
  //         user_id:ObjectId('64285f85ee39ca4434a14f5d'),
  //         rating: 5,
  //         comment: 'nice',
  //         product_id: item._id,
  //         product_type: item.type,
  //         deviceinfo: {
  //           osName: "Windows",
  //           osVersion: "10",
  //           mobileVendor: "none",
  //           mobileModel: "none",
  //           deviceType: "browser",
  //           browserName: "Opera",
  //           browserVersion: "96",
  //           fullBrowserVersion: "96.0.0.0",
  //           isMobile: false,
  //           isDesktop: true,
  //           isTablet: false
  //         },
  //         ipinfo: {
  //           ipVersion: 4,
  //           ipAddress: "103.151.128.152",
  //           latitude: 20.23333,
  //           longitude: 85.833328,
  //           countryName: "India",
  //           countryCode: "IN",
  //           timeZone: "+05:30",
  //           zipCode: "752101",
  //           cityName: "Bhubaneshwar",
  //           regionName: "Odisha"
  //         },
  //       },
  //
  //
  //     ];
  //
  //
  //     ProductReview.create(demo_reviews)
  //     .then(response=>{
  //
  //
  //       //update review under product
  //       ProductReview.find({product_id:item._id}).distinct('rating')
  //       .then(ratings=>{
  //         console.log('review_done',i);
  //
  //         // var total = ratings.length;
  //         // var max_val = _.max(ratings);
  //         //
  //         // Product.findByIdAndUpdate(item._id,{$set:{review_total:total,review_heighest_star:max_val}})
  //         // .then(updpro=>{
  //         //
  //         // })
  //
  //       })
  //     })
  //   });
  //
  //   res.json({
  //     response:true
  //   })
  // })



};


const admin_list_view = (req,res) => {

  // query.select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 } });


  Product.find({})
  // Product.find({type:['Configurable']})
  // Product.find({})
  .sort({ name: -1 })
  .select({name:1, _id:1, type:1, product_labels:1, product_collection:1, stock:1, sku:1, price_lowest:1, price_heighest:1, pricemain:1,step:1})
  .then((response) => {
    res.json({
      response: true,
      datas: response,
    });
  });
}


const singleproductinformation = (req,res) => {
  Product.findById(req.params.id)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })

  // Product.findOne({_id: req.params.id })
  //  .populate("category") // key to populate
  //  .then(response => {
  //    res.json({
  //      response:true,
  //      data:response
  //    })
  //  });

}



const viewproductinfo = (req,res) => {

  if(req.params.type==='Configurable'){


    Product.findOne({_id:req.params.id},(err,parentdata)=>{
      if(!err){
        Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:req.params.id},(err1,childdata)=>{
          if(!err1){

            res.json({
              response:true,
              total:childdata.length,
              parentdata,
              childdata
            })

          }else{
            res.json({
              response:false,
              message:'childdata_data_error'
            })
          }
        })


      }else{
        res.json({
          response:false,
          message:'parent_data_error'
        })
      }
    })
  }

}



const viewurl = (req,res) => {
  Product.findOne({url:req.params.url},(err,parentdata)=>{
    if(parentdata!==null){
      if(parentdata.type==='Simple' || parentdata.type==='ConfigurableChild'){
        res.json({
          response:true,
          parentdata,
          childdata:false
        })
        console.log(parentdata)

      }else{

        Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:parentdata._id},(err1,childdata)=>{
          if(!err1){
            res.json({
              response:true,
              parentdata,
              childdata
            })

          }else{
            res.json({
              response:false,
              message:'childdata_data_error'
            })
          }
        })
      }

    }else{
      console.log(err)
      res.json({
        response:false,
        message:'product_not_found'
      })
    }
  })
}



//for website only
const viewweb = (req,res) => {

  Product.findOne({url:req.params.url}).populate('product_tax')
  .then(parentdata=>{

    if(parentdata!==null){
      if(parentdata.type==='Simple' || parentdata.type==='ConfigurableChild'){
        res.json({
          response:true,
          parentdata,
          childdata:false
        })
        console.log(parentdata)

      }else{

        Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:parentdata._id},(err1,childdata)=>{
          if(!err1){
            res.json({
              response:true,
              parentdata,
              childdata
            })

          }else{
            res.json({
              response:false,
              message:'childdata_data_error'
            })
          }
        })
      }

    }else{
      res.json({
        response:false,
        message:'product_not_found'
      })
    }

  })


  // Product.findOne({url:req.params.url},(err,parentdata)=>{
  //   if(parentdata!==null){
  //     if(parentdata.type==='Simple' || parentdata.type==='ConfigurableChild'){
  //       res.json({
  //         response:true,
  //         parentdata,
  //         childdata:false
  //       })
  //       console.log(parentdata)
  //
  //     }else{
  //
  //       Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:parentdata._id},(err1,childdata)=>{
  //         if(!err1){
  //           res.json({
  //             response:true,
  //             parentdata,
  //             childdata
  //           })
  //
  //         }else{
  //           res.json({
  //             response:false,
  //             message:'childdata_data_error'
  //           })
  //         }
  //       })
  //     }
  //
  //   }else{
  //     console.log(err)
  //     res.json({
  //       response:false,
  //       message:'product_not_found'
  //     })
  //   }
  // })
}




const allproducts = async (req,res) => {

  //page number
  var page= 1;

  var showpage = page-1;
  var perPage = Number(2)
  , page = showpage > 0 ? showpage : 0

  var findQuery={status:'Active',type:['Configurable']};


  Product
    .find(findQuery)
    .limit(perPage)
    .skip(perPage * page)
    .sort({_id: 'desc'})
    .exec(function (err, doc) {
      Product.find(findQuery).count().exec(async function (err, count) {


        var jsonData={
          response: true,
          page_number: page+1,
          total_pages: Math.ceil(count / perPage),
          total_datas:count,
          datas_per_page:perPage,
          attributes:{
            sizes : await Product.find(findQuery).distinct("myattributes.Size"),
            color: await Product.find(findQuery).distinct("myattributes.Color"),
            group: await Product.find(findQuery).distinct("myattributes.Group"),

          },
          datas: doc,
        }




        res.json({
          ...jsonData
        })
      })
    })


    // Product.find(findQuery).distinct('myattributes.Size').count().exec(function (err, count) {
    //     console.log('The number of unique users is: %d', count);
    // });
    //
    // Product.find(findQuery)
    //   .distinct('myattributes.Size')
    //   .count(function (err, count) {
    //       //The number of unique users is 'count'
    //       // console.log(count)
    //   })

    // console.log(123)

}






//FINAL
const productsearchfinal = async (req,res) => {
  console.log(req.body)

  res.json({
    response:true
  })
}



const productsearch = async (req,res) => {


  // console.log(req.body.search_price_min);
  // console.log(req.body.search_price_max);





  // Product.find( {  name: { $all: str2 } , status:'Active',  type: { $in: [ 'Configurable', 'Simple','ConfigurableChildXX' ] } } )
  //
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     datas:response
  //   })
  // })


  ////PAGINATION////
  var page= req.body.pagination_page_number;

  var showpage = page-1;
  var perPage = req.body.pagination_datas_per_page
  , page = showpage > 0 ? showpage : 0


  var searchQuery = {
    // "name": { $all: [new RegExp('betta','i')] },


    "status":'Active',
    "type": { "$in": [ 'Configurable', 'Simple' ] },
    // "pricemain":{"$gte": 4000.11,"$lte": 99999},
    "pricemain":{"$gte": req.body.search_price_min,"$lte": req.body.search_price_max},



    // "category": { "$in": req.body.search_main_attributes.category },
    // "subcategory": { "$in": req.body.search_main_attributes.subcategory },
    // "childcategory": { "$in": req.body.search_main_attributes.childcategory },

    // "pricemain":{"$gte": 0,"$lte": 222222222222222},
    // category: { "$in": [ 'Women', 'Simple' ] },
    // "subcategory": ['Boys']
    // category: { "$in": ['Home and Living'] },
  };

  // "name": ,

  // SEARCH BY PRODUCT NAME
  console.log(req.body.search_product_name)
  if(!req.body.search_product_name){
    var search_key = '';
  }else{
    var search_key = req.body.search_product_name;
    // var search_key = 'betta red';

    var search_key1=_.words(search_key, /[^, ]+/g);
    var final_search_key=[];
    search_key1.forEach((item, i) => {
      final_search_key.push(new RegExp(item,'i'))
    });
    searchQuery.name={ $all: final_search_key };
  }



  var search_main_attributes = req.body.search_main_attributes;
  var objectkeys=Object.keys(search_main_attributes);
  objectkeys.forEach((item, i) => {
      if(search_main_attributes[item].length!==0){
        var titem=item;
        searchQuery[item] = { "$in": search_main_attributes[item] }
      }
  });

  var search_other_attributes = req.body.search_other_attributes;
  var objectkeysZ=Object.keys(search_other_attributes);
  objectkeysZ.forEach((item, i) => {
      if(search_other_attributes[item].length!==0){
        var titem=item;
        searchQuery[titem] = { "$in": search_other_attributes[item] }
      }
  });


  //***first 1
  // Product.find(searchQuery).limit(perPage).skip(perPage * page)
  var query = Product.find(searchQuery,).sort({[req.body.search_sortby.vname]:req.body.search_sortby.value}).limit(perPage).skip(perPage * page);
  query.select({ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 } });
  query.exec(async function(err,main_datas){


      //***second 2
      var query2 = Product.find(searchQuery).select(['_id','price_heighest','price_lowest']) //remove unnecessary fields here
      query2.exec(async function(err,all_datas){


        // var ca1= await Product.aggregate([{ $match: searchQuery },{ $unwind: "$category" },{ $sortByCount: "$category" }]);
        // var ca2= await Product.aggregate([{ $match: searchQuery },{ $unwind: "$subcategory" },{ $sortByCount: "$subcategory" }]);
        // var ca3= await Product.aggregate([{ $match: searchQuery },{ $unwind: "$childcategory" },{ $sortByCount: "$childcategory" }]);

        res.json({
          response: true,
          search_product_name:search_key,
          page_number: page+1,
          total_pages: Math.ceil(all_datas.length/ perPage),
          total_datas:all_datas.length,
          datas_per_page:perPage,
          datas: main_datas,
          price_slider:{
            max:all_datas.length>0? _.maxBy(all_datas, function(o) { return o.price_heighest }).price_heighest:0,
            min:all_datas.length>0?_.minBy(all_datas, function(o) { return o.price_lowest }).price_lowest:0,
          },
          count_attributes:{

            product_brand: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$product_brand" },{ $sortByCount: "$product_brand" }]),

            category: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$category" },{ $sortByCount: "$category" }]),
            subcategory: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$subcategory" },{ $sortByCount: "$subcategory" }]),
            childcategory: await Product.aggregate([{ $match: searchQuery },{ $unwind: "$childcategory" },{ $sortByCount: "$childcategory" }]),
            '63651da5838601459cb06b7c': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63651da5838601459cb06b7c" },{ $sortByCount: "$63651da5838601459cb06b7c" }]), //size
            '63651dcb838601459cb06b80': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63651dcb838601459cb06b80" },{ $sortByCount: "$63651dcb838601459cb06b80" }]), //size
            '63651df0838601459cb06b84': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63651df0838601459cb06b84" },{ $sortByCount: "$63651df0838601459cb06b84" }]),
            '63651e33838601459cb06b8b': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63651e33838601459cb06b8b" },{ $sortByCount: "$63651e33838601459cb06b8b" }]),
            '6385f975f49b0800283f5d54': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$6385f975f49b0800283f5d54" },{ $sortByCount: "$6385f975f49b0800283f5d54" }]),
            '6386b78c6febbf3040fa71da': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$6386b78c6febbf3040fa71da" },{ $sortByCount: "$6386b78c6febbf3040fa71da" }]),

            '63f7726843f7c73f60eaea10': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63f7726843f7c73f60eaea10" },{ $sortByCount: "$63f7726843f7c73f60eaea10" }]),
            '63f7721243f7c73f60eaea0c': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63f7721243f7c73f60eaea0c" },{ $sortByCount: "$63f7721243f7c73f60eaea0c" }]),
            '63f771c543f7c73f60eaea08': await Product.aggregate([{ $match: searchQuery },{ $unwind: "$63f771c543f7c73f60eaea08" },{ $sortByCount: "$63f771c543f7c73f60eaea08" }]),

          },
          main_attributes:{ //---normal attribute
            product_brand: _.compact(await query2.distinct("product_brand")),
            category: _.compact(await query2.distinct("category")),
            subcategory: _.compact(await query2.distinct("subcategory")),
            childcategory: _.compact(await query2.distinct("childcategory")),
          },
          other_attributes:{ //---config attribute
            '63651da5838601459cb06b7c': _.compact(await query2.distinct("63651da5838601459cb06b7c")),
            '63651dcb838601459cb06b80': _.compact(await query2.distinct("63651dcb838601459cb06b80")),
            '63651df0838601459cb06b84': _.compact(await query2.distinct("63651df0838601459cb06b84")),
            '63651e33838601459cb06b8b': _.compact(await query2.distinct("63651e33838601459cb06b8b")),
            '6385f975f49b0800283f5d54': _.compact(await query2.distinct("6385f975f49b0800283f5d54")),
            '6386b78c6febbf3040fa71da': _.compact(await query2.distinct("6386b78c6febbf3040fa71da")),

            '63f7726843f7c73f60eaea10': _.compact(await query2.distinct("63f7726843f7c73f60eaea10")),
            '63f7721243f7c73f60eaea0c': _.compact(await query2.distinct("63f7721243f7c73f60eaea0c")),
            '63f771c543f7c73f60eaea08': _.compact(await query2.distinct("63f771c543f7c73f60eaea08")),





          }
        })
      })
  })
}


const showallproductspagination = (req,res) => {
  var page= req.params.page;

  var showpage = page-1;
  var perPage = 2
  , page = showpage > 0 ? showpage : 0

  Product
    .find({type:['Configurable']})
    // .select('name')
    .limit(perPage)
    .skip(perPage * page)
    .sort({_id: 'desc'})
    .exec(function (err, events) {
      Product.find({type:['Configurable']}).count().exec(function (err, count) {
        res.json({
          events: events,
          page: page+1,
          pages: Math.ceil(count / perPage),
          tot:count

        })
      })
    })
}



//CREATE STEP 1
const create1 = async (req,res) => {
  Product.findOne({sku:req.body.sku},async(errx,docx)=>{
    if(docx===null){

      Product.findOne({url:req.body.url}, async(err,doc)=>{
        if(doc===null){
          //Configurable Product Create
          if(req.body.type==='Configurable'){

            //UPDATE ATTRIBUTE
            // var attributedata=[];
            // var jsondata = await Attribute.find({});
            //
            // jsondata.forEach((attr, i) => {
            //   if(attr.type==='Single Dropdown' || attr.type==='Multiple Dropdown' || attr.type==='Radio' || attr.type==='Checkbox'){
            //     if(attr.isconfigproduct==='Yes'){
            //       attributedata.push({
            //         _id:attr._id,
            //         name:attr.name,
            //         values:attr.datasarray,
            //       })
            //     }
            //   }
            // });

            var entrydata={
              status:req.body.status,
              // type:req.body.type,
              type:'Configurable',
              url:req.body.url,
              is_parent:'Yes',
              sku:req.body.sku,
              name:req.body.name,
              step:req.body.step,
              issubtype:req.body.issubtype,
              pricemain:[0],
              price_lowest:0,
              price_heighest:0,
              images:[],
              videos:[],
              meta_title:req.body.name,
              meta_desc:req.body.name,
              meta_key:''
              // attributedata:attributedata,
              // configproductarray:[],
              // configproducts:[]
            }

            Product.create(entrydata,(err,data)=>{
              res.json({
                response:true,
                data
              })
            })
          }



          if(req.body.type==='Simple'){
            var entrydata={
              status:req.body.status,
              // type:req.body.type,
              type:'Simple',
              url:req.body.url,
              is_parent:'Yes',
              sku:req.body.sku,
              name:req.body.name,
              step:req.body.step,
              issubtype:req.body.issubtype,
              pricemain:[0],
              price_lowest:0,
              price_heighest:0,
              images:[],
              videos:[],
              meta_title:req.body.name,
              meta_desc:req.body.name,
              meta_key:'',
              config_attribues:{}
              // myattributes:[],
            }

            Product.create(entrydata,(err,data)=>{
              res.json({
                response:true,
                data
              })
            })
          }





        }else{
          res.json({
            response:false,
            message:'url_available'
          })
        }
      })

    }else{
      res.json({
        response:false,
        message:'sku_available'
      })
    }
  })



}



//CREATE STEP 2


function generateProduct(attributedata,parent){


  var datas=[];

  //1 PRODUCT
  if(attributedata.length===1){

      console.log(attributedata)
      attributedata[0].values.forEach((item0, i1) => {

          var dts={
            order:0,
            status:'Active',
            config_added_status:'active',
            type:'ConfigurableChild',
            url:parent.url+'-'+item0.toLowerCase(),
            is_parent:'No',
            parent_id:parent._id,
            images:[],
            videos:[],
            sku:parent.sku+'-'+attributedata[0].valuesnames[i1].toLowerCase(),
            name:parent.name+' '+attributedata[0].valuesnames[i1],
            stock:0,
            pricemain:[0],
            pricedisplay:0,
            pricetemp:0,
            totalconfigattribute:item0,
            [attributedata[0].name]:item0,
            config_attribues:{
              [attributedata[0].name]:item0
            }
          }
          datas.push(dts);
      });
  }

  //2 PRODUCT
  if(attributedata.length===2){
    console.log(attributedata)

    attributedata[0].values.forEach((item0, i0) => {
      attributedata[1].values.forEach((item1, i1) => {
          var dts={
            order:0,
            status:'Active',
            config_added_status:'active',
            type:'ConfigurableChild',
            url:parent.url+'-'+item0.toLowerCase()+'-'+item1.toLowerCase(),
            is_parent:'No',
            parent_id:parent._id,
            images:[],
            videos:[],
            sku:parent.sku+'-'+attributedata[0].valuesnames[i0].toLowerCase()+'-'+attributedata[1].valuesnames[i1].toLowerCase(),
            name:parent.name+' '+attributedata[0].valuesnames[i0]+' '+attributedata[1].valuesnames[i1],
            stock:0,
            pricemain:[0],
            pricedisplay:0,
            pricetemp:0,
            totalconfigattribute:item0+'-'+item1,
            [attributedata[0].name]:item0,
            [attributedata[1].name]:item1,
            config_attribues:{
              [attributedata[0].name]:item0,
              [attributedata[1].name]:item1,
            }
          }
          datas.push(dts);
      });
    });
  }


  //3 PRODUCT
  if(attributedata.length===3){
    attributedata[0].values.forEach((item0, i0) => {
      attributedata[1].values.forEach((item1, i1) => {
        attributedata[2].values.forEach((item2, i2) => {

          var dts={
            order:0,
            status:'Active',
            config_added_status:'active',
            type:'ConfigurableChild',
            url:parent.url+'-'+item0.toLowerCase()+'-'+item1.toLowerCase()+'-'+item2.toLowerCase(),
            is_parent:'No',
            parent_id:parent._id,
            images:[],
            videos:[],
            sku:parent.sku+'-'+attributedata[0].valuesnames[i0].toLowerCase()+'-'+attributedata[1].valuesnames[i1].toLowerCase()+'-'+attributedata[2].valuesnames[i2].toLowerCase(),
            name:parent.name+' '+attributedata[0].valuesnames[i0]+' '+attributedata[1].valuesnames[i1]+' '+attributedata[2].valuesnames[i2],
            stock:0,
            pricemain:[0],
            pricedisplay:0,
            pricetemp:0,
            totalconfigattribute:item0+'-'+item1+'-'+item2,
            [attributedata[0].name]:item0,
            [attributedata[1].name]:item1,
            [attributedata[2].name]:item2,
            config_attribues:{
              [attributedata[0].name]:item0,
              [attributedata[1].name]:item1,
              [attributedata[2].name]:item2,
            }
          }
          datas.push(dts);

        });
      });
    });
  }


  //4 PRODUCT
  if(attributedata.length===4){
    attributedata[0].values.forEach((item0, i0) => {
      attributedata[1].values.forEach((item1, i1) => {
        attributedata[2].values.forEach((item2, i2) => {
          attributedata[3].values.forEach((item3, i3) => {


            var dts={
              order:0,
              status:'Active',
              config_added_status:'active',
              type:'ConfigurableChild',
              url:parent.url+'-'+item0.toLowerCase()+'-'+item1.toLowerCase()+'-'+item2.toLowerCase()+'-'+item3.toLowerCase(),
              is_parent:'No',
              parent_id:parent._id,
              images:[],
              videos:[],
              sku:parent.sku+'-'+attributedata[0].valuesnames[i0].toLowerCase()+'-'+attributedata[1].valuesnames[i1].toLowerCase()+'-'+attributedata[2].valuesnames[i2].toLowerCase()+'-'+attributedata[3].valuesnames[i3].toLowerCase(),
              name:parent.name+' '+attributedata[0].valuesnames[i0]+' '+attributedata[1].valuesnames[i1]+' '+attributedata[2].valuesnames[i2]+' '+attributedata[3].valuesnames[i3],
              stock:0,
              pricemain:[0],
              pricedisplay:0,
              pricetemp:0,
              totalconfigattribute:item0+'-'+item1+'-'+item2+'-'+item3,
              [attributedata[0].name]:item0,
              [attributedata[1].name]:item1,
              [attributedata[2].name]:item2,
              [attributedata[3].name]:item3,
              config_attribues:{
                [attributedata[0].name]:item0,
                [attributedata[1].name]:item1,
                [attributedata[2].name]:item2,
                [attributedata[3].name]:item3,
              }
            }
            datas.push(dts);

          });
        });
      });
    });
  }

  return datas;
}








const create2config = (req,res) => {

  //ATTRIBUTE GENERATES FOR PARENT
  // var myattributes=[];

  var config_attribues={};

  req.body.attributedata.forEach((itemad, i) => {
    var name=itemad.name;
    var value=itemad.values;
    // var temp_name=itemad.valuesnames;
    // var
    // myattributes.push({[name]:value})

    config_attribues[name]=value

  });

  console.log(req.body.attributedata)
  //==========MAIN START==========//
  // const update1 = { configproductarray: allarray, step:'step3config',attributedata:req.body.attributedata,myattributes };
  const update1 = { step:'step3config',config_attribues };
  update2 = Object.assign(update1,config_attribues);

  // console.log(update2)

  Product.findOneAndUpdate({_id:req.body._id},update2)
  .then(parentdata=>{

    //GENERATE CONFIG PRODUCTS
    var getdata=generateProduct(req.body.attributedata,parentdata)


    //DELETE PREVIOUS ATTRIBUTE PRODUCTS
    Product.find({parent_id:parentdata._id}).remove().exec(function(err, deletedatas) {
      console.log('deleted_old_data')

      //INSERT NEW ATTRIBUTE PRODUCTS
      Product.create(getdata)
      .then(create=>{
        console.log('inserted_new_attribute')
      })

    })
  })


  res.json({
    response:true,
    datas:req.body
  })
}


//CHECK ID IS CORRECT OR NOT
const checkproductid = (req,res) => {
  Product.findOne({_id:req.params.id},(err,data)=>{
    if(data===undefined){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data
      })
    }
  })
}



//GET ALL CONFIG PRODUCT LIST UNDER PARENT
const configproductparentchildboth = (req,res) => {

  Product.findOne({_id:req.params.parent_id},(err,parentdata)=>{
    if(!err){


      Product.find({type:'ConfigurableChild',is_parent:'No',parent_id:req.params.parent_id},(err1,childdata)=>{
        if(!err1){

          res.json({
            response:true,
            total:childdata.length,
            parentdata,
            childdata
          })

        }else{
          res.json({
            response:false,
            message:'childdata_data_error'
          })
        }
      })


    }else{
      res.json({
        response:false,
        message:'parent_data_error'
      })
    }
  })


  // Product.findById(req.params.parent_id)
  // .then(parentdata=>{
  //
  //   console.log(parentdata)
  //
  //   // Product.find({type:'Configurable',is_parent:'No',parent_id:req.params.parent_id})
  //   // .then(childdata=>{
  //   //   res.json({
  //   //     response:true,
  //   //     total:childdata.length,
  //   //     parentdata,
  //   //     childdata
  //   //   })
  //   //   console.log(response)
  //   // })
  //
  // })

}


//ADD PRODUCT IMAGE
const productimageadd = (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "products.jpg",
      useUniqueFileName: true,
      folder: "product_images",
    })
    .then((response) => {

      var ins_data={
        fileId:response.fileId,
        filePath:response.filePath,
        size:response.size,
        url:response.url,
      }

      Product.findByIdAndUpdate(req.body.product_id,{$push:{images:ins_data}})
      .then(response=>{

        Product.findById(req.body.product_id)
        .then(datas=>{
          res.json({
            response: true,
            data: datas,
          });
        })

      })

    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });

};


//<<<===DELETE PRODUCT===>>>
const deleteproduct = async (req,res) => {

  Product.findById(req.params.id, async(errss,doc)=>{
    // console.log(doc)

    if(doc===null){
      res.json({
        response:false,
        message:'Product not found'
      })
    }else{

      // delete main/parent product
      Product.findByIdAndDelete(req.params.id,(err,docx)=>{
        if(!err){
          res.json({
            response:true
          })
        }else{
          res.json({
            response:false,
            message:'Failed'
          })
        }

        Cart.deleteMany({ product_id: req.params.id })
        .then(response=>{
          console.log('removed from cart success')
        })


        //delete images
        if(doc.images.length>0){
          doc.images.forEach((item, i) => {
            imagekit
              .deleteFile(item.fileId)
          });
        }
      })

      //delete child products
      if(doc.type==='Configurable'){

        Product.find({parent_id:req.params.id}).distinct('_id')
        .then(respids=>{

              respids.forEach((ids, i) => {
                Product.findByIdAndDelete(ids,(err,docw)=>{
                  //delete images
                  if(docw.images.length>0){
                    docw.images.forEach((itemo, i) => {
                      imagekit
                        .deleteFile(itemo.fileId)
                    });
                  }
                })
              });

        })
      }
    }

  })
}


//UPDTE IMAGE JSON
const updateimagejson = (req,res) => {
  imagekit
    .deleteFile(req.body.image.fileId)
    .then((response) => {

      Product.findByIdAndUpdate(req.body.product_id,{$set:{images:req.body.images}})
      .then(response=>{

        Product.findById(req.body.product_id)
        .then(datas=>{
          res.json({
            response: true,
            data:datas
          });
        })

      })

    })
    .catch((error) => {
      console.log(error);
    });
}



//UPDATE CONFIG PRODUCT IMAGE STATUS
const updateconfigproductimagestatus = (req,res) => {

  // console.log(req.body)

  Product.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}






//CONFIG PRODUCT FIRST IMAGE ADD
const productsingleimageaddconfig = (req,res) => {
  // const encoded = req.file.buffer.toString("base64");
  //
  // imagekit
  //   .upload({
  //     file: encoded,
  //     fileName: "products.jpg",
  //     useUniqueFileName: true,
  //     folder: "product_config_images",
  //   })
  //   .then((response) => {
  //
  //     var ins_data={
  //       fileId:response.fileId,
  //       filePath:response.filePath,
  //       size:response.size,
  //       url:response.url,
  //     }
  //
  //     Product.findByIdAndUpdate(req.body.product_id,{$push:{images:ins_data}})
  //     .then(response=>{
  //       res.json({
  //         response: true,
  //         data: response,
  //       });
  //     })
  //
  //   })
  //   .catch((error) => {
  //     res.json({
  //       response: error,
  //     });
  //   });
}




const addnewconfigattribute = (req,res) => {

  Product.create(req.body.totdata)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })

}


const savesortingattributeproducts =(req,res) => {


  req.body.datas.forEach((item, i) => {
    item.order=i;
    Product.findByIdAndUpdate(item._id,item)
    .then(response=>{
      if(i===req.body.datas.length-1){
        res.json({
          response:true,
        })
      }
    })
  });
}



const updateconfigproductwithparent =(req,res) => {
  Product.findByIdAndUpdate(req.body._id,req.body.data)
  .then(resas=>{
    console.log('Success')
    // res.json({
    //   response:true
    // })
  })

  req.body.childdata.forEach((item, i) => {
    item.order=i;
    Product.findByIdAndUpdate(item._id,item)
    .then(response=>{
      if(i===req.body.childdata.length-1){

        res.json({
          response:true,
        })
      }
    })
  });

}


const updatesimpleproduct = (req,res) => {


  Product.findByIdAndUpdate(req.body._id,req.body.data)
  .then(resas=>{
    res.json({
      response:true
    })
  })
}


const searchproduct = async (req,res) => {

  console.log(req.body)

  var page= req.body.page;

  var showpage = page-1;
  var perPage = req.body.perpage
  , page = showpage > 0 ? showpage : 0

  Product
    .find({status:'Active',type:['Configurable','Simple'],"$or": [ { "name" : { $regex: req.body.value, $options: 'i' }}, { "sku" : req.body.value }, { "tags" : { $regex: req.body.value, $options: 'i' }} ]})
    // .select('name')
    .limit(perPage)
    .skip(perPage * page)
    .sort({_id: 'desc'})
    .exec(function (err, datas) {
      Product.find({status:'Active',type:['Configurable','Simple'],"$or": [ { "name" : { $regex: req.body.value, $options: 'i' }}, { "sku" : req.body.value }, { "tags" : { $regex: req.body.value, $options: 'i' }}]}).count().exec(function (err, count) {
        res.json({
          value:req.body.value,
          datas: datas,
          page: page+1,
          perpage:req.body.perpage,
          pages: Math.ceil(count / perPage),
          tot:count
        })
      })
    })




}






const dummyentry = (req,res) => {

  // var data={"showImagesInConfigProducts":false,"product_collection":"","product_labels":"","product_brand":"","stock":0,"status":"Active","type":"Simple","url":"dummy","is_parent":"Yes","sku":"565621123","name":"Anubias Nana Petite on Lava Rock","step":"step2simple","issubtype":"No","pricemain":[1400],"price_lowest":1400,"price_heighest":1400,"images":[{"fileId":"63379069bf51c1dc8056a88d","filePath":"/product_images/products_zlmJtZJx5.jpg","size":156353,"url":"https://ik.imagekit.io/nextjsecommerce/product_images/products_zlmJtZJx5.jpg","chosen":false,"selected":false},{"fileId":"633790c0bf51c1dc8058b06d","filePath":"/product_images/products_R-SoWnhqZ.jpg","size":156353,"url":"https://ik.imagekit.io/nextjsecommerce/product_images/products_R-SoWnhqZ.jpg","chosen":false,"selected":false},{"fileId":"633790cbbf51c1dc80593a96","filePath":"/product_images/products_8EoeOSahu.jpg","size":156353,"url":"https://ik.imagekit.io/nextjsecommerce/product_images/products_8EoeOSahu.jpg","chosen":false,"selected":false}],"videos":[],"meta_title":"Anubias Nana Petite on Lava Rock","meta_desc":"Anubias Nana Petite on Lava Rock","meta_key":"","category":["63328bf97bc0e4612c488c6f"],"subcategory":["63328c067bc0e4612c488c77"],"childcategory":[],"product_tax":[],"description":"<p>qwdqw</p>\n","pricedisplay":1500}
  //
  // for(var i = 0;i<1990;i++){
	// // loop code here
  // Product.create(data)
  // .then(e=>{
  //   console.log('success')
  // })
  //
  // console.log(i)
  // }


  /////////////////////


  Product.remove({url: 'dummy'}, function(err){
    if(err){
      console.log(err)
    }else{
      res.json({
        response:true
      })
    }
  });





}




const searchproduct_byname = (req,res) => {


  // var str = req.body.search_keyword;
  // var str1=_.words(str, /[^, ]+/g);
  // var str2=[];
  // str1.forEach((item, i) => {
  //   str2.push(new RegExp(item,'i'))
  // });
  // Product.find( {  name: { $all: str2 } , status:'Active',  type: { $in: [ 'Configurable', 'Simple','ConfigurableChildXX' ] } } )
  //
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     datas:response
  //   })
  // })

}


const review_store = (req,res) => {
  ProductReview.findOne({product_id:req.body.product_id,user_id:req.body.user_id})
  .then(data=>{
    if(data===null){
      ProductReview.create(req.body)
      .then(response=>{
        res.json({
          response:true,
        })



        //update review under product
        ProductReview.find({product_id:req.body.product_id}).distinct('rating')
        .then(ratings=>{
          console.log(ratings);

          var total = ratings.length;
          var max_val = _.max(ratings);

          Product.findByIdAndUpdate(req.body.product_id,{$set:{review_total:total,review_heighest_star:max_val}})
          .then(updpro=>{

          })
        })


        Notification.create({user_id:req.body.user_id,message:'notification_product_review',info_id:response._id,info_url:`/reviews/${response._id}`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
        .then(resasac=>{
          console.log('created notification_product_review');
        })


        //send email thank you notification email to users
        emailsender.emailsendFunction('user_send_thankyou_for_product_review',req.body.user_email,{username:req.body.user_name.split(' ')[0]},'email_user_thankyou_for_product_review',true,req.body.user_id)
        .then(response=>{
          console.log('send email_user_thankyou_for_product_review');
        })


        // //send new user notification to admin
        emailsenderAdmin.emailsendFunction('admin_new_user_new_product_review',{datalink:`/reviews/${response._id}`,user:{name:req.body.user_name,email:req.body.user_email},starrating:req.body.rating,comment:req.body.comment,productname:req.body.product_name,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_to_admin_new_user_product_review')
        .then(response=>{
          console.log('send admin_new_user_product_review');
        })


      })





    }else{
      res.json({
        response:false,
        message:'error2'
      })
    }
  }).catch(err=>{
    res.json({
      response:false,
      message:'error1'
    })
  })


}

const review_underproducts = (req,res) => {
  ProductReview.find({product_id:req.params.product_id}).populate('user_id','name email')
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  }).catch(err=>{
    res.json({
      response:false,
    })
  })
}

const review_edit = (req,res) =>{
  ProductReview.findByIdAndUpdate(req.body._id,req.body)
  .then(resp=>{
    res.json({
      response:true,
    })

    //update review under product
    ProductReview.find({product_id:req.body.product_id})
    .then(ratings=>{
      console.log(ratings);

      // var total = ratings.length;
      // var max_val = mostFrequent(ratings, total);
      var total = ratings.length;
      var max_val = mostFrequent(_.map(ratings,'rating'));


      console.log('array',_.map(ratings,'rating'))
      console.log('max_val',max_val[0]);

      Product.findByIdAndUpdate(req.body.product_id,{$set:{review_total:total,review_heighest_star:max_val[0]}})
      .then(updpro=>{

      })
    })

    Notification.create({user_id:req.body.user_id,message:'notification_product_review_update',info_id:response._id,info_url:`/users/${response._id}`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
    .then(resasac=>{
      console.log('created notification_product_review_update');
    })

  }).catch(err=>{
    res.json({
      response:false,
    })
  })
}

const review_delete = (req,res) => {
  ProductReview.findByIdAndRemove(req.params.id)
  .then(resp=>{
    res.json({
      response:true,
    })
  }).catch(err=>{
    res.json({
      response:false,
    })
  })
}

const admin_all_reviews = (req,res) => {
  ProductReview.find().populate('user_id','name email').sort({ _id: -1 })
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  }).catch(err=>{
    res.json({
      response:false,
    })
  })
}

const seen_all_reviews = (req,res) => {
  ProductReview.update({isAdminSeen:false}, {$set: { isAdminSeen: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const admin_seen_allreviews_under_product = (req,res) => {
  ProductReview.update({isAdminSeen:false,product_id:req.params.product_id}, {$set: { isAdminSeen: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const user_product_reviews = (req,res) => {
  ProductReview.find({user_id:req.params.user_id})
  .populate('product_id','name url')
  .select({product_id:1, rating:1, comment:1, createdAt:1})
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

const update_product_single_value = (req,res) => {
  Product.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}

module.exports = {
  index,
  singleproductinformation,
  allproducts,
  productsearch,
  showallproductspagination,
  create1,
  create2config,
  checkproductid,
  configproductparentchildboth,
  productimageadd,
  deleteproduct,
  updateimagejson,
  productsingleimageaddconfig,
  updateconfigproductimagestatus,
  addnewconfigattribute,
  savesortingattributeproducts,
  updateconfigproductwithparent,
  productsearchfinal,
  updatesimpleproduct,
  viewproductinfo,
  searchproduct,
  dummyentry,
  viewurl,
  viewweb,
  searchproduct_byname,
  review_store,
  review_underproducts,
  review_edit,
  review_delete,
  admin_all_reviews,
  seen_all_reviews,
  admin_seen_allreviews_under_product,
  user_product_reviews,
  update_product_single_value,
  admin_list_view
};
