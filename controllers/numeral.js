exports.toCurrency = function(amount,currency_active){
  var numeral = require('numeral');
  //
  // var number = numeral(amount);
  // numeral.defaultFormat('0,0.00');
  //
  // return '₹'+number.format();


  var number = numeral((1/Number(currency_active.value))*amount);
  numeral.defaultFormat('0,0.00');
  // return `₹${number.format()}`
  return `${currency_active.symbol}${number.format()}`;
};
