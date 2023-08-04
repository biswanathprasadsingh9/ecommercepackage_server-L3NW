const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { uuid } = require("uuidv4");

const DomainExtractDetailsSchema = new Schema(
  {
    uuid: {
      type: String,
    },
    userid: {
      type: String,
    },
    domain: {
      type: String,
    },
    emails: {
      type: Object,
    },
    tel: {
      type: Object,
    },
    facebook: {
      type: Object,
    },
    instagram: {
      type: Object,
    },
    twitter: {
      type: Object,
    },
    linkedin: {
      type: Object,
    },
    googleplus: {
      type: Object,
    },
    youtube: {
      type: Object,
    },
    whatsapp: {
      type: Object,
    },
    printrest: {
      type: Object,
    },
    skype: {
      type: Object,
    },
  },
  { timestamps: true }
);

const DomainExtractDetails = mongoose.model(
  "DomainExtractDetails",
  DomainExtractDetailsSchema
);
module.exports = DomainExtractDetails;
