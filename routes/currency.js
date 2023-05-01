const express = require('express');
const router = express.Router();

const CurrencyController = require('../controllers/CurrencyController');

router.get('/',CurrencyController.index);
router.post('/',CurrencyController.store);
router.post('/update',CurrencyController.update);
router.get('/deletefile/:id',CurrencyController.deletefile);

module.exports=router;
