const { response } = require("express");

const Image = require("../models/Image");

const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});

//***INDEX***
const index = (req, res) => {
  Image.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    })
    .catch({});
};

//***STORE***
const store = (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  console.log(req.body)
  imagekit
    .upload({
      file: encoded,
      // fileName: "file.xlsx",
      fileName:req.body.filename,
      useUniqueFileName: true,
      folder: "files",
    })
    .then((response) => {
      Image.create(response);
      res.json({
        response: true,
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });
};


//***STORE***
const uploadwithoutsave = (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      // fileName: "file.xlsx",
      fileName:req.body.filename,
      useUniqueFileName: true,
      folder: req.body.server_path,
    })
    .then((response) => {
      res.json({
        response: true,
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });
};




//***DELETE***
const remove = (req, res) => {
  imagekit
    .deleteFile(req.params.fileId)
    .then((response) => {
      Image.findByIdAndRemove(req.params.id).then((response) => {
        res.json({
          response: true,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};


const deleteFile = (req,res) => {

  console.log(req.params.id)

  imagekit
    .deleteFile(req.params.id)
    .then((response) => {
      res.json({
        response: true,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { index,uploadwithoutsave, store, remove,deleteFile };
