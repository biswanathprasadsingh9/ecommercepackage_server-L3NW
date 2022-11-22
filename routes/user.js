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



module.exports=router;
