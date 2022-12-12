const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');

router.get('/',OrderController.index);
router.post('/payondelivery',OrderController.payondelivery);


module.exports=router;
