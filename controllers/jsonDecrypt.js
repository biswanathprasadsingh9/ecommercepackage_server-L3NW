var CryptoJS = require("crypto-js");

exports.decrypt = function(json){
  var bytes = CryptoJS.AES.decrypt(json, 'rnecom');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
