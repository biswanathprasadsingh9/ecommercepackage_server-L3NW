exports.encrypt = function(json){
  var CryptoJS = require("crypto-js");
  return CryptoJS.AES.encrypt(JSON.stringify(json), process.env.DB_JSON_ENC_KEY).toString();
};
