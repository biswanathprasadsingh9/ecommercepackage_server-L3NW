var CryptoJS = require("crypto-js");
exports.encrypt = function(json){
  var ss=CryptoJS.AES.encrypt(JSON.stringify(json), 'rnecom').toString();
  return ss;
};
