exports.notification = function(name){

  switch(name){
  case 'notification_new_user_register':
    result="New user registration";
    break;
  case 'notification_new_cart_item':
    result="New cart item";
    break;
  case 'notification_new_order':
    result="New order booked";
    break;
  case 'notification_user_account_information_changed':
    result="Account information update";
    break;
  case 'notification_user_password_changed':
    result="Account Passoword update";
    break;
  default:
    result="Blank Notification";
  }

  return result;
};
