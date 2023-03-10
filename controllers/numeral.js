exports.toCurrency = function(amount){
  var numeral = require('numeral');

  var number = numeral(amount);
  numeral.defaultFormat('0,0.00');

  return '₹'+number.format();
};
