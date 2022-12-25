const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');

router.get('/',OrderController.index);
router.post('/payondelivery',OrderController.payondelivery);
router.post('/payonpaypal',OrderController.payonpaypal);

router.get('/findorder/:order_id',OrderController.view);
router.get('/order_complete_view/:id',OrderController.order_complete_view);



module.exports=router;
