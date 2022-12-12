const express = require('express');
const router = express.Router();

const CouponController = require('../controllers/CouponController');

router.get('/',CouponController.index);
router.post('/',CouponController.store);
router.post('/update',CouponController.update);
router.get('/deletefile/:id',CouponController.deletefile);


router.post('/checkcouponcode',CouponController.checkcouponcode);


module.exports=router;
