const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  fileId:{
    type:String
  },
  name:{
    type:String
  },
  size:{
    type:Number
  },
  filePath:{
    type:String
  },
  url:{
    type:String
  },
  fileType:{
    type:String
  },
  thumbnailUrl:{
    type:String
  },
},{timestamps:true})

const Image = mongoose.model('Image',ImageSchema)
module.exports = Image;
