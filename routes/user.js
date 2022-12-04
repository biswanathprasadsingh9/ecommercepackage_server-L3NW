const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/',UserController.index);
router.post('/register',UserController.register);
router.post('/login',UserController.login);
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



module.exports=router;
