const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { uuid } = require("uuidv4");

const UpdateSchema = new Schema(
  {
    version: {
      type: String,
    },
    downloadlink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Update = mongoose.model("Update", UpdateSchema);
module.exports = Update;
