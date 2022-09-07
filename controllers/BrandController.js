const response = require("express");

const Brand = require("../models/Brand");

const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});

// INDEX
const index = (req, res) => {
  Brand.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  const encoded = req.file.buffer.toString("base64");
  imagekit
    .upload({
      file: encoded,
      fileName: "brands.webp",
      useUniqueFileName: true,
      folder: "brands",
    })
    .then((response) => {
      var tempData = {
        brand_name: req.body.brand_name,
        brand_url: req.body.brand_url,
        brand_status: req.body.brand_status,
        brand_image: response.filePath,
        brand_image_id: response.fileId,
      };
      Brand.create(tempData).then((reask) => {
        res.json({
          response: true,
        });
      });
    })
    .catch((error) => {
      res.json({
        response: false,
        response: error,
      });
    });
};


const update = (req,res) => {


  if(req.file===undefined){


    var tempData={
      brand_name: req.body.brand_name,
      brand_url: req.body.brand_url,
      brand_status: req.body.brand_status,
    }

    Brand.findByIdAndUpdate(req.body._id,tempData)
    .then(response=>{
      res.json({
        response:true
      })
    })


  }else{
    //DELETE IMAGE FIRST
    imagekit.deleteFile(req.body.brand_image_id).then((response) => {

      //UPLAOD IN IMAGE KIT
      const encoded = req.file.buffer.toString("base64");
      imagekit
        .upload({
          file: encoded,
          fileName: "brands.webp",
          useUniqueFileName: true,
          folder: "brands",
        })
        .then((response) => {
          var tempData = {
            brand_name: req.body.brand_name,
            brand_url: req.body.brand_url,
            brand_status: req.body.brand_status,
            brand_image: response.filePath,
            brand_image_id: response.fileId,
          };
          //UPDATE IN DATABASE
          Brand.findByIdAndUpdate(req.body._id,tempData)
          .then(response=>{
            res.json({
              response:true
            })
          })
        })
        .catch((error) => {
          res.json({
            response: false,
            response: error,
          });
        });

    });







  }



}

const deletefile = (req, res) => {
  imagekit.deleteFile(req.params.fileid).then((response) => {
    Brand.findByIdAndRemove(req.params.id).then((rs) => {
      res.json({
        response: true,
      });
    });
  });
};


const updatestatus = (req,res) => {
  var tempData={
    brand_status:req.params.status==='Active'?'Active':'InActive'
  }
  Brand.findByIdAndUpdate(req.params.id,tempData)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

module.exports = {
  index,
  store,
  update,
  deletefile,
  updatestatus
};
