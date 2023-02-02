const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

const multer  = require('multer')
const upload = multer({});

router.get('/',UserController.index);
router.put('/:id',UserController.update);

router.get('/admin_view_user_details/:id',UserController.admin_view_user_details);
router.get('/admin_delete_user_details/:id',UserController.admin_delete_user_details);




router.post('/update_password',UserController.update_password);
router.post('/update_profile_picture',upload.single('image'),UserController.update_profile_picture);

router.post('/forgotpassword',UserController.forgotpassword);

router.get('/check_reset_password_code/:code',UserController.check_reset_password_code);
router.post('/update_password_web',UserController.update_password_web);



router.post('/register',UserController.register);

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
