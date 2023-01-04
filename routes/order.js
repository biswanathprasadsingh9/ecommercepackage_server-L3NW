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






module.exports=router;
