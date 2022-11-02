const express = require('express');
const router = express.Router();

const ShippingController = require('../controllers/ShippingController');

router.get('/',ShippingController.index);
router.post('/',ShippingController.store);
router.post('/update',ShippingController.update);
router.get('/deletefile/:id',ShippingController.deletefile);




module.exports=router;
