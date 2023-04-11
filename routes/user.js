const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

const multer  = require('multer')
const upload = multer({});

router.get('/',UserController.index);
router.put('/:id',UserController.update);



router.get('/mark_all_seen',UserController.mark_all_seen);
router.get('/mark_all_seen_cart',UserController.mark_all_seen_cart);




router.get('/admin_all_notifications',UserController.admin_all_notifications);
router.get('/admin_setseen_notifications/:id',UserController.admin_setseen_notifications);
router.get('/admin_setseen_notifications_byurl/:url',UserController.admin_setseen_notifications_byurl); //not_used code:9658
router.get('/admin_setseen_notifications_bymessage/:message',UserController.admin_setseen_notifications_bymessage);
router.get('/admin_setseen_notifications_byuserid/:user_id',UserController.admin_setseen_notifications_byuserid);
router.get('/admin_setseen_notifications_bymessage_of_user/:message/:user_id',UserController.admin_setseen_notifications_bymessage_of_user);
router.get('/admin_delete_notification/:id',UserController.admin_delete_notification);
router.get('/admin_clearall_notifications',UserController.admin_clearall_notifications);
router.get('/admin_readall_notifications',UserController.admin_readall_notifications);



router.post('/admin_account_information_update',UserController.admin_account_information_update);

router.post('/admin_theme_update',UserController.admin_theme_update);



router.get('/admin_all_pagevisit_records',UserController.admin_all_pagevisit_records);
router.get('/admin_clearall_pagevisit_records',UserController.admin_clearall_pagevisit_records);
router.get('/admin_mostviewed_page',UserController.admin_mostviewed_page);



router.get('/admin_all_cart_items',UserController.admin_all_cart_items);
router.get('/admin_delete_items_from_cart/:id',UserController.admin_delete_items_from_cart);




router.get('/admin_view_user_details/:id',UserController.admin_view_user_details);
router.get('/admin_delete_user_details/:id',UserController.admin_delete_user_details);




router.get('/admin_view_user_login_details/:user_id',UserController.admin_view_user_login_details);
router.get('/admin_view_user_cart_details/:user_id',UserController.admin_view_user_cart_details);
router.get('/admin_view_user_order_details/:user_id',UserController.admin_view_user_order_details);
router.get('/admin_view_user_payment_history/:user_id',UserController.admin_view_user_payment_history);


router.get('/login_as_user_step1/:user_id',UserController.login_as_user_step1);
router.get('/login_as_user_step2/:uniqid',UserController.login_as_user_step2);


router.get('/admin_view_all_loginrecords',UserController.admin_view_all_loginrecords);
router.get('/admin_clearall_loginrecords',UserController.admin_clearall_loginrecords);
router.get('/admin_delete_loginrecord/:id',UserController.admin_delete_loginrecord);


router.get('/admin_view_all_emailrecords',UserController.admin_view_all_emailrecords);
router.get('/admin_view_emailrecord/:id',UserController.admin_view_emailrecord);
router.get('/admin_delete_emailrecord/:id',UserController.admin_delete_emailrecord);





router.get('/admin_view_user_dashboard_details/:user_id',UserController.admin_view_user_dashboard_details);



router.post('/user_page_view',UserController.user_page_visit_tracking_store);

router.post('/user_productvisit_store',UserController.user_productvisit_store);
router.get('/user_productvisit_list/:user_id',UserController.user_productvisit_list);

router.get('/admin_user_all_productvisit_list',UserController.admin_user_all_productvisit_list);
router.get('/admin_delete_user_productvisit_list/:id',UserController.admin_delete_user_productvisit_list);
router.get('/admin_user_all_productvisit_list_clear',UserController.admin_user_all_productvisit_list_clear);




router.post('/update_password',UserController.update_password);
router.post('/update_profile_picture',upload.single('image'),UserController.update_profile_picture);

router.post('/forgotpassword',UserController.forgotpassword);

router.get('/check_reset_password_code/:code',UserController.check_reset_password_code);
router.post('/update_password_web',UserController.update_password_web);



router.post('/register',UserController.register);


router.get('/send_email_verification_code/:user_id',UserController.send_email_verification_code);
router.get('/logout_from_alldevice/:code',UserController.logout_from_alldevice);



router.post('/register_fromadmin',UserController.register_fromadmin);


router.post('/login',UserController.login);

router.post('/login_with_google',UserController.login_with_google);


router.post('/loginadmin',UserController.loginadmin);
router.post('/emailverification',UserController.emailverification);

router.post('/addaddressregisterfromcart',UserController.registerfromcart); //ADD ADDRESS FROM CART (unregistrated user)
router.post('/addaddressfromcart',UserController.addaddressfromcart); ////ADD ADDRESS FROM CART (registrated user)

router.get('/getusershippingaddress/:id',UserController.getusershippingaddress);

router.get('/deleteaddress/:id',UserController.deleteaddress);
router.post('/updateuseraddress',UserController.updateuseraddress);
router.post('/updatedefauladdress',UserController.updatedefauladdress);

router.get('/getuserdefaultshippingaddress/:user_id',UserController.getuserdefaultshippingaddress);
router.get('/getusershippingmethodselected/:user_id',UserController.getusershippingmethodselected);

router.post('/saveusershippingmethodselected',UserController.saveusershippingmethodselected);

router.get('/getcartinfo/:user_id',UserController.getcartinfo);

router.post('/updateshppingadditionalcomments',UserController.updateshppingadditionalcomments);


module.exports=router;
