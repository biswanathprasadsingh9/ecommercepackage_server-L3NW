const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { uuid } = require("uuidv4");

const DomainExtractSchema = new Schema(
  {
    uuid: {
      type: String,
    },
    userid: {
      type: String,
    },
    title: {
      type: String,
    },
    totaldomains: {
      type: Number,
    },
  },
  { timestamps: true }
);

const DomainExtract = mongoose.model("DomainExtract", DomainExtractSchema);
module.exports = DomainExtract;
