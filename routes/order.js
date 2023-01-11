const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');
const PDFController = require('../controllers/PDFController');


router.get('/',OrderController.index);
router.post('/payondelivery',OrderController.payondelivery);
router.post('/payonpaypal',OrderController.payonpaypal);

router.get('/findorder/:order_id',OrderController.view);
router.get('/order_complete_view/:id',OrderController.order_complete_view);

router.get('/generatepdftest',PDFController.index);
router.get('/deletepdf',PDFController.deletepdf);



router.get('/get_web_user_orderslist/:user_id',OrderController.get_web_user_orderslist);
router.get('/get_web_user_order_details/:order_id',OrderController.get_web_user_order_details);




module.exports=router;
