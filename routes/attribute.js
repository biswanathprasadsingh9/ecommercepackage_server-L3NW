const express = require('express');
const router = express.Router();

const AttributeController = require('../controllers/AttributeController');

router.get('/',AttributeController.index);
router.post('/',AttributeController.store);
router.post('/update',AttributeController.update);
router.get('/deletefile/:id',AttributeController.deletefile);







module.exports=router;
