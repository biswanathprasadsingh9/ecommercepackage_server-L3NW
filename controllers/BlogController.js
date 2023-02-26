const response = require("express");

const Blog = require("../models/Blog");

// INDEX
const index = (req, res) => {
  Blog.find()
    .sort({ _id: -1 })
    .select('_id url image.filePath title readtime createdAt readtime')
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {
  Blog.create(req.body).then((reask) => {
    res.json({
      response: true,
    });
  });
};

const view = (req, res) => {
  Blog.findById(req.params.id).then((response) => {
    res.json({
      response: true,
      data: response,
    });
  });
};

const update = (req, res) => {
  Blog.findByIdAndUpdate(req.body._id, req.body).then((response) => {
    res.json({
      response: true,
    });
  });
};

const deletefile = (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then((response) => {
    res.json({
      response: true,
    });
  });
};

const web_view_blog = (req, res) => {
  Blog.findOne({url:req.params.url})
  .then(response=>{
    if(response===null){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data:response
      })
    }
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}

module.exports = {
  index,
  store,
  view,
  update,
  deletefile,
  web_view_blog
};
