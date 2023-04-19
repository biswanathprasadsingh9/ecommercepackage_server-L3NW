exports.decrypt = function(json){
  var CryptoJS = require("crypto-js");
  var bytes = CryptoJS.AES.decrypt(json, process.env.DB_JSON_ENC_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
