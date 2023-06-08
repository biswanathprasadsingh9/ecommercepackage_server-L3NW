const express = require('express');
const router = express.Router();

const ShippingRuleController = require('../controllers/ShippingRuleController');

router.get('/',ShippingRuleController.index);
router.post('/',ShippingRuleController.store);
router.post('/update',ShippingRuleController.update);
router.get('/deletefile/:id',ShippingRuleController.deletefile);




module.exports=router;
