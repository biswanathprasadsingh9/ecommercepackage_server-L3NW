const response = require("express");

const DataCountry = require("../models/DataCountry");
const DataState = require("../models/DataState");
const DataCity = require("../models/DataCity");

// const Attribute = require("../models/Attribute");


// INDEX
const index = async (req, res) => {
  res.json({
    response:true
  })
};


const get_country = (req,res) => {
  DataCountry.find().sort('name').select('name')
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}


const get_getstate = (req,res) => {
  DataState.find({country_name:req.params.country}).sort('name').select('name')
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}


const get_getcity = (req,res) => {
  DataCity.find({state_name:req.params.state}).sort('name').select('name')
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}


const getstatelistundercountry = (req,res) => {
  console.log(req.body)

  DataState.find({country_name:req.body.country_names}).sort('country_name').select('name country_name')
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}


const insert_data_city = (req,res) => {


    // tempData.forEach((item, i) => {
    //   DataCity.create(item)
    //   .then(res=>{
    //     console.log('success')
    //   })
    // });



    res.json({
      resp:true
    })

    // var urls = ['http://mylink1', 'http://mylink2', 'http://mylink3', 'http://mylink4'],
    // interval = 1, //  = 2s1
    // increment = 1;
    //
    // urls.forEach(function(url) {
    //   var runner = setTimeout(function() {
    //     // Do your stuff.
    //     // console.log(url);
    //     DataCity.create(url)
    //     .then(res=>{
    //       console.log('success')
    //     })
    //
    //     clearTimeout(runner);
    //   }, interval * increment);
    //
    //   increment = increment + 1;
    // })





}

module.exports = {
  index,insert_data_city,get_country,get_getstate,get_getcity,getstatelistundercountry
};
