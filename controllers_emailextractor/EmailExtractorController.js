const response = require("express");

const User = require("../models_emailextractor/User");

// INDEX
const index = (req, res) => {
  User.find()
    .sort({ _id: -1 })
    .then((data) => {
      res.json({
        response: true,
        data,
      });
    });
};



module.exports = {
  index,
};
