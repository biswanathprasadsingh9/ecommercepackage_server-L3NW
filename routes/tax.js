const express = require('express');
const router = express.Router();

const TaxController = require('../controllers/TaxController');

router.get('/',TaxController.index);
router.post('/',TaxController.store);
router.post('/update',TaxController.update);
router.get('/deletefile/:id',TaxController.deletefile);




module.exports=router;
