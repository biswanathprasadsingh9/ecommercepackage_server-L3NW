const response = require("express");

const Blog = require("../models/Blog");

// INDEX
const index = (req, res) => {
  Blog.find()
    .sort({ _id: -1 })
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

module.exports = {
  index,
  store,
  view,
  update,
  deletefile,
};
