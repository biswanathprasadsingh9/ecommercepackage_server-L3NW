const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');
const PDFController = require('../controllers/PDFController');


router.get('/',OrderController.index);

router.get('/mark_all_seen',OrderController.mark_all_seen);


router.post('/payondelivery',OrderController.payondelivery);
router.post('/payonpaypal',OrderController.payonpaypal);
router.get('/payonstripe',OrderController.payonstripe);


router.get('/findorder/:order_id',OrderController.view);
router.get('/order_complete_view/:id',OrderController.order_complete_view);

router.get('/generatepdftest',PDFController.index);
router.get('/deletepdf',PDFController.deletepdf);

router.get('/pdf_store_test',OrderController.pdf_store_test);


router.get('/get_web_user_orderslist/:user_id',OrderController.get_web_user_orderslist);
router.get('/get_web_user_order_details/:order_id',OrderController.get_web_user_order_details);


router.post('/update_order_status',OrderController.update_order_status);
router.post('/update_order_address',OrderController.update_order_address);



router.post('/generate_invoice',OrderController.generate_invoice);



router.get('/vieworder_byorderid/:order_id',OrderController.vieworder_byorderid);



router.get('/delete_single_timeline_item/:id',OrderController.delete_single_timeline_item);
router.get('/delete_order/:id',OrderController.delete_order);

router.get('/admin_all_paymenthistory',OrderController.admin_all_paymenthistory);
router.get('/payments_useruser/:user_id',OrderController.payments_useruser);



// payment
router.get('/paypal_first',OrderController.paypal_first);
router.get('/paypal_second',OrderController.paypal_second);

router.get('/stripe_first',OrderController.stripe_first);


router.get('/match_payment_recive_code/:user_id/:temp_receive_code',OrderController.match_payment_recive_code);





router.get('/:id',OrderController.vieworder);

module.exports=router;
