const express = require('express');
const router = express.Router();

const CourierController = require('../controllers/CourierController');

router.get('/',CourierController.index);
router.post('/',CourierController.store);
router.post('/update',CourierController.update);
router.get('/deletefile/:id',CourierController.deletefile);




module.exports=router;
